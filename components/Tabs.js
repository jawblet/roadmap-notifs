import { useRef, useContext, useEffect, useState } from 'react';
import Flex from "@utils/Flex";
import { useRouter } from 'next/router';
import styles from "@styles/Tabs.module.scss";
import Badge from "@components/Badge";
import { UserContext } from "@utils/UserContext";

const Tabs = ({ view, setView, notifs }) => {
    const [value, setValue] = useState(null);
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

    useEffect(() => {
        if(notifs.data) {
            setValue(notifs.data.false?.length ?? 0);
        }
    }, [notifs]);

    return (
        <Flex className={styles.tabs} middle>
            {menu.map((el, i) => {
                return  (<h3 key={el.label} className={view === el.keyword ? `${styles.tab} ${styles.tab_active}` : styles.tab}
                    onClick={() => {
                        setView(el.keyword);
                    }}>
                    {el.label}
            </h3>)
            })}
            {(value !== null) && 
                <Badge value={value} ref={notifRef} 
                handleClick={() => router.push('#notifications')
                }/>
            }
    </Flex>
    );
};

export default Tabs;