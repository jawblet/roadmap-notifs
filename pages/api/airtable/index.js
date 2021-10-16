const airtable = require("airtable");
import prepareNotifs from "@utils/prepareNotifs";
import Feature from "../../../models/Feature";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async function handler(req, res) {
    if(req.method === "GET") {
        res.status(200).send("get!");
    }

    if (req.method === "POST") {
        try {
            const base = airtable.base(process.env.AIRTABLE_BASE_ID);
            const data = [];
            let features;
            let notifs;
            let deletedFts;
            
            await base('Product DB').select({
                view: "Full view by Product domain",
                filterByFormula: "NOT({Phase} = 'Backlog')"
            }).eachPage(function page(records, fetchNextPage) {        
                records.forEach(function(record) {
                    data.push(record._rawJson);
                });
                fetchNextPage();
            });
    
            // get latest version of AT 
            const newFeatures = data.map(el => {
                const { id, fields } = el;
                return {
                    id: id,
                    name: fields["Feature"],
                    description: fields["Description"],
                    phase: fields["Phase"],
                    owner: fields["Owner"],
                    date: fields["Est. delivery"],
                    dev_team: fields["Dev team"],
                    product_domain: fields["Product domain"]
                }
            });

            // get existing version of AT 
            const dbFeatures = await Feature.find({});

            if(!dbFeatures) {
                // if no existing features, add all 
               features = await Feature.create(newFeatures);
            } else {
            
            // REMOVE DELETED FEATURES
                // check if there are any obsolete ids in the db
                const oldFeatures = dbFeatures.map(el => {
                   const ftExists = newFeatures.some(curr => curr.id === el.id);
                   if(!ftExists) return el._id
                }).filter(el => el);

                console.log(oldFeatures);
                if(oldFeatures) {
                   deletedFts = await Feature.deleteMany({_id: oldFeatures});
                }

                // ADD OR UPDATE CURRENT FEATURES
                features = await Promise.all(newFeatures.map(async(el) => {
                    // find if item exists  
                    const existingItem = dbFeatures.find(ft => ft.id === el.id);

                    // update any changed properties in db or create 
                        await Feature.updateOne(
                            { id: el.id }, 
                            el, 
                            {
                                upsert: true,
                            })

                        // check items have dates 
                        if(existingItem?.date && el.date) {

                            // convert dates to same format 
                            const oldDate = new Date(existingItem.date).toISOString();
                            const newDate = new Date(el.date).toISOString();

                            // check if dates are the same
                            if(oldDate !== newDate) {
                                // if date changed, send notifs to watchers
                                notifs = await prepareNotifs(existingItem, el);
                            }   
                        }
                                     
                    return el;
                }))
            }

            return res.status(201).json({ deletedFts, notifs, features })
        } catch(err) {
            console.log("error")
            res.status(400).json(err)
        }
    }

    if(req.method === "DELETE") {
        try {
            await Feature.deleteMany({});
            res.status(204).json({});
        } catch(err) {
            res.status(400).json("error")
        }
        
    }
    
  }

  // if((existingItem.date !== el.date) || (existingItem.phase !== el.phase)) {
