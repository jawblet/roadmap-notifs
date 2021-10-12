import { useRef, useContext } from 'react';
import Flex from "@utils/Flex";
import { useRouter } from 'next/router';
import styles from "@styles/Tabs.module.scss";
import Badge from "@components/Badge";
import { UserContext } from "@utils/UserContext";
import { useQuery } from 'react-query'; 
import { getNotifs } from "@utils/api";

const Tabs = ({ view, setView }) => {
    const notifRef = useRef(null);
    let router = useRouter();

    const menu = [
        {label: "Upcoming features",
        keyword: "upcoming"},
       // {label: "Other roadmap features",
       // keyword: "other"},
        {label: "My notifications",
        keyword: "notifications"},
    ]
    
    const { user } = useContext(UserContext); 
    const notifs = useQuery('getNotifs', () => getNotifs(user._id));

    return (
        <Flex className={styles.tabs} middle>
            {menu.map((el, i) => {
                return  (<h3 key={el.label} className={view === el.keyword ? `${styles.tab} ${styles.tab_active}` : styles.tab}
                    onClick={() => {
                        router.push(`#${el.keyword}`);
                        setView(el.keyword);
                    }}>
                    {el.label}
            </h3>)
            })}
          {notifs?.data && 
            <Badge value={notifs.data.false?.length || 0} ref={notifRef} 
                handleClick={() => router.push('#notifications')
            }/>          
          }
    </Flex>
    );
};

export default Tabs;