import dateChangeNotifs from "@utils/dateChangeNotifs";

export default async function checkNotifs(users, oldFt, newFt) {    
    /* DATE CHANGE NOTIFS */ 

    // check if date changed 
    if(oldFt?.date && newFt.date) { 

            // convert dates to same format 
            const oldDate = new Date(oldFt.date).toISOString();
            const newDate = new Date(newFt.date).toISOString();

            // compare dates
            if(oldDate !== newDate) {
                console.log("date changed");
                const notifs = await dateChangeNotifs(users, oldFt, newFt);
                return notifs;
            }   
        }

    return null;
}