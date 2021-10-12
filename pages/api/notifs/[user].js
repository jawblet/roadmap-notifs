
import dbConnect from '@utils/dbConnect';
import Notification from "@models/Notification";
import Feature from "@models/Feature";
import groupBy from "lodash/groupBy";

dbConnect();

export default async function handler(req, res) {
    const { user } = req.query; 

    // get user's notifs 
    if(req.method === "GET") {
        try {
            const notifs = await Notification.find({ user }).populate("feature").sort({ createdAt: -1 });
            const groups = groupBy(notifs, "read");
            res.status(200).json(groups);
        } catch(err) {
            res.status(400).json(err);
        }   
    }

    // mark user's notifs as read 
    if(req.method === "PUT") {
        try {
            const notifs = await Notification.updateMany({user}, { read: true });
            res.status(200).json(notifs); 
        } catch(err) {
            res.status(400).json(err);
        }
    }
}