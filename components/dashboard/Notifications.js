import React, { useEffect, useContext } from 'react';
import styles from "@styles/Notification.module.scss";
import useNotifications  from '@hooks/useNotifications';
import { useQuery } from 'react-query';
import { getNotifs } from '@utils/api';
import Loading from "@components/Loading";
import { UserContext } from "@utils/UserContext";

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
    const { updateNotifs } = useNotifications();

    useEffect(() => {
        updateNotifs.mutate();
    }, []);

    return( <div>
        <div>
            {!unread.length 
            ? <h3 style={{textAlign:"center"}}> No unread notifications </h3> 
            : unread.map(el => {
                return <Notification key={el._id} el={el}/>
            })}
        </div>
        {read.map(el => {
                return <Notification key={el._id} el={el}/>
            })}
        </div>
    )
}


const Notifications = () => {
    const { user } = useContext(UserContext); 
    const { isLoading, error, data } = useQuery('getNotifs', () => getNotifs(user._id));

    if(isLoading) return <Loading/>
    if(error) return <h1>oh no...error</h1>

    if(!data) {
        <h1>No notifications yet.</h1>
    }

    return (
        <div style={{padding: "1rem"}}>
           <NotificationsList read={data.true} unread={data.false}/>
        </div>
    );
};

export default Notifications;