import React from 'react';
import Flex from "@utils/Flex";
import { useRouter } from 'next/router';
import styles from "@styles/Tabs.module.scss";

const Tabs = ({ view, setView }) => {
    let router = useRouter();

    const menu = [
        {label: "Upcoming features",
        keyword: "upcoming"},
        {label: "Other roadmap features",
        keyword: "other"},
        {label: "My notifications",
        keyword: "notifications"},
    ]

    return (
        <Flex gap={3} className={styles.tabs}>
            {menu.map(el => {
                return  (<h3 key={el.label} className={view === el.keyword ? `${styles.tab} ${styles.tab_active}` : styles.tab}
                onClick={() => {
                    router.push(`#${el.keyword}`);
                    setView(el.keyword);
                }}>
                    {el.label}
            </h3>)
            })}
           
    </Flex>
    );
};

export default Tabs;