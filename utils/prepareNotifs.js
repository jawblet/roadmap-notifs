import User from "@models/User";
import Notification from '@models/Notification';
const sgMail = require('@sendgrid/mail');

async function sendEmail(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    try {
        const email = await sgMail.send(msg);
        return email;
    } catch (error) {
        console.error(error);
  }
}


export default async function prepareNotifs(oldFeature, newFeature){
    const { _id } = oldFeature; 

    // find users who are watching the changed feature 
    const users = await User.find({ features: _id });
    
    // SEND NOTIFS PER USER
    const notifications = await Promise.all(users.map(async (user) => {
            const notif = await Notification.create({
                 user, 
                 feature: _id,
                 content:`The feature ${newFeature.name} changed its estimated delivery date to ${newFeature.date}`,
                 read: false
             })
            return notif;
    }))
           
    // SEND EMAILS PER USER
    const emails = await Promise.all(users.map(async (user) => {
        const msg = {
            to: user.email, // Change to your recipient
            from: 'julia.bell@piano.io', // Change to your verified sender
            subject: `A feature you're watching changed its delivery date`,
            text: `The feature ${newFeature.name} changed its estimated delivery date to ${newFeature.date}`
        }

        const email = await sendEmail(msg);
        return email;
    }))

            
       
    return { emails, notifications };
}