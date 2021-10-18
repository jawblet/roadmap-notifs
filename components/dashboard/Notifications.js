import React, { useEffect, useState, useContext } from 'react';
import styles from "@styles/Notification.module.scss";
import useNotifications  from '@hooks/useNotifications';
import { useQuery } from 'react-query';
import { getNotifs } from '@utils/api';
import Loading from "@components/Loading";
import { UserContext } from "@utils/UserContext";
import useTimeout from '@hooks/useTimeout';

const Notification = ({ el }) => {
    const createdAt = new Date(el.createdAt).toLocaleString().replaceAll('/', '-');

    return(
        <div key={el._id} className={el.read ? styles.notif : `${styles.notif} ${styles.notif_unread}`}>
            <p className="light">On {createdAt}:</p>
            <p>{el.content}</p>
        </div>
    )
}

const NotificationsList = ({ read = [], unread = [] }) => {
    const [hasTimeElapsed, setHasTimeElapsed] = React.useState(false);
    const { updateNotifs } = useNotifications();

    useTimeout(() => {
        setHasTimeElapsed(true);
      }, 1500);

      useEffect(() => {
        hasTimeElapsed && updateNotifs.mutate();
    }, [hasTimeElapsed]);

    return( <div>
        <div>
            {unread && unread.map(el => {
                return <Notification key={el._id} el={el}/>
            })}
        </div>
            {read && read.map(el => {
                    return <Notification key={el._id} el={el}/>
                })}
        </div>
    )
}

/* 
*/

const Notifications = ({ notifs }) => {
    const { user } = useContext(UserContext); 
    const [data, setData] = useState(null);
    //const { isLoading, error, data } = useQuery('getNotifs', () => getNotifs(user._id));

    useEffect(() => {
        if(notifs.data) {
            setData(notifs.data)
        }
    }, [notifs])

    if(notifs.isLoading || !data) return <Loading/>
    if(notifs.error) return <h1>oh no...error</h1>
    console.log(notifs);
    
    if(Object.keys(notifs.data).length === 0) return (
        <h3 style={{textAlign:"center", padding:"3rem"}}>No notifications yet.</h3>
        )

    return (
        <div style={{padding: "1rem"}}>
           <NotificationsList read={data?.true} unread={data?.false}/>
        </div>
    );
};

export default Notifications;