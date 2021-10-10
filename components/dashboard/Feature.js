import React from 'react';
import Flex from "@utils/Flex";
import styles from "@styles/Dashboard.module.scss";
import useSubscriptions from '@hooks/useSubscriptions';


const Feature = ({ feature, userFeatures }) => {
    const date = new Date(feature.date).toLocaleDateString();
    const { editSubscriptions } = useSubscriptions();

    return (
        <Flex key={feature._id} gap={1.5} between className={styles.feature} id={feature._id}>
            <p style={{width:"60%"}}>{feature.name}</p>
            <p style={{width:"5%"}}>{date}</p>
            <input type="checkbox" style={{width:"10%"}}
                    checked={!!userFeatures && userFeatures.some(ft => ft._id === feature._id)}
                    onChange={(e) => { editSubscriptions(e.target.checked, feature, userFeatures)}}/>
        </Flex>
    );
};

export default Feature;