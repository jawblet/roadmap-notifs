const airtable = require("airtable");
// import base from "@utils/airtableBase";

export default async function handler(req, res) {
    const { id } = req.query;
    const base = airtable.base(process.env.AIRTABLE_BASE_ID);
    try {
        await base('Product DB').find(id, function(err, record) {
            if (err) { console.error(err); return; }
            res.status(200).json(record);
        });
    } catch(err) {
        res.status(400).json(err);
    }
}