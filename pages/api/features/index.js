import Feature from "@models/Feature";
import groupBy from "lodash/groupBy";
import dbConnect from '@utils/dbConnect';

dbConnect();

export default async function handler(req, res) {
    const { hasDate } = req.query;
    if(req.method === "GET") {
        try {
            let features = await Feature.find({ date: { $exists: hasDate } }).sort({product_domain: 1, date: 1});
            const length = features.length; 

            features = groupBy(features, "product_domain");

            res.status(200).json({length, features, groups: Object.keys(features)});
        } catch(err) {
            res.status(400).json(err);
        }
    }

    if(req.method === "DELETE") {
        try {
            await Feature.deleteMany({});
            res.status(204).json({});
        } catch(err) {
            console.log(err)
        }
    }
}