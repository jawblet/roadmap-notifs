import Notification from '../../../models/Notification';
import dbConnect from '../../../utils/dbConnect';

dbConnect();

export default async function handler(req, res) {
    const { user, feature } = req.body;
    console.log(req);

    const notif = await Notification.create({
        user, 
        feature: feature._id,
        content: `You subscribed to the feature ${feature.name}`
    }) 

    res.status(201).json(notif);
}

/**
 * 
  * Notif types:
  *  Date changed
  *  Phase changed 
  * Subscribe 
  * Unsubscribe
 */

/*
string
user id
feature id 
*/

