import Feature from "@models/Feature";
import User from "@models/User";
import dbConnect from "@utils/dbConnect";
import checkNotifs from "@utils/checkNotifs";
import queryAirtable from "@utils/queryAirtable";

dbConnect();

export default async function handler(req, res) {
    if(req.method === "GET") {
        res.status(200).send("test GET");
    }

    if (req.method === "POST") {
        try {
            let features = {deleted: null, updated: null};

            const data = await queryAirtable();
    
            // GET LATEST VERSION OF AT 
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

            // GET STORED VERSION OF AT 
            const dbFeatures = await Feature.find({});

            // IF NO EXISTING FTS, ADD. 
            // ELSE, COMPARE VERSIONS.
            if(!dbFeatures) {
                features.updated = await Feature.create(newFeatures);
            
            } else {
            
            // REMOVE OBSOLETE FEATURES
                const oldFeatures = dbFeatures.map(el => {
                   const ftExists = newFeatures.some(curr => curr.id === el.id);
                   if(!ftExists) return el._id
                }).filter(el => el);

                if(oldFeatures) {
                    features.deleted = await Feature.deleteMany({_id: oldFeatures});
                }

            // ADD OR UPDATE CURRENT FEATURES
            features.updated = await Promise.all(newFeatures.map(async(el) => {
                let notifs;
                    // find if feature exists in db
                    const existingItem = dbFeatures.find(ft => ft.id === el.id);

                    // update any changed properties in db or create 
                   const ft = await Feature.updateOne(
                        { id: el.id }, 
                        el, 
                        { upsert: true });

                    // check if ft has users watching it 
                    if(existingItem) {
                        const subscribers = await User.find({ features: existingItem._id });
                        if(subscribers) {
                            notifs = await checkNotifs(subscribers, existingItem, el);
                        }   
                    }
                                                    
                    return {ft, notifs};
                }))
  
                features.updated = features.updated.filter(el => el.ft.modifiedCount || el.ft.upsertedCount)

            }

            return res.status(201).json(features)
        } catch(err) {
            console.log(err)
            res.status(400).json(err)
        }
    }

    if(req.method === "DELETE") {
        try {
            await Feature.deleteMany({});
            res.status(204);
        } catch(err) {
            res.status(400).json(`Error deleting features: ${err}`);
        }
    }
    
  }

  // if((existingItem.date !== el.date) || (existingItem.phase !== el.phase)) {
