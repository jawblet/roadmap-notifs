
import dbConnect from '../../../utils/dbConnect';
import User from "@models/User";

dbConnect();

export default async function handler(req, res) {

    try {
        const user = await User.findOneAndUpdate(req.query.id, {features: req.body.features});
        res.status(200).json(user);
    } catch(err) {
        res.status(400).json(err);
    }
    
}