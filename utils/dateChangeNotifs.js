import User from "@models/User";
import Notification from '@models/Notification';
import sendEmail from "./sendEmail";

export default async function dateChangeNotifs(users, oldFeature, newFeature){
    const { _id } = oldFeature;    

    // Format the new date 
    const newDate = new Date(newFeature.date).toLocaleDateString();
    const oldDate = new Date(oldFeature.date).toLocaleDateString();
    
    // SEND NOTIFS PER USER
    const notifications = await Promise.all(users.map(async (user) => {
            const notif = await Notification.create({
                 user, 
                 feature: _id,
                 content:`The feature ${newFeature.name} changed its estimated delivery date to ${newDate} from ${oldDate}`,
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
            text: `The feature ${newFeature.name} changed its estimated delivery date to ${newFeature.date}`,
            html: `<div style={{padding:"3rem"}}>
                <p>Hi ${user.name},</p>
                <br/>
                <p>
                    The feature <b>${newFeature.name}</b> changed its estimated delivery date to <b>${newDate}</b> from <b>${oldDate}</b>.
                </p>
                <br/>
                <p>
                   This feature is owned by ${newFeature.owner}.
                </p>
                <br/>
                <p>Have a good day,</p>
                <p>Piano roadmap notifier</p>
            </div>`
        }

        const email = await sendEmail(msg);
        return email;
    }))

       
    return { emails, notifications };
}