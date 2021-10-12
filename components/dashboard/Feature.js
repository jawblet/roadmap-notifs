import React from 'react';
import Flex from "@utils/Flex";
import styles from "@styles/Dashboard.module.scss";
import useSubscriptions from '@hooks/useSubscriptions';


const Feature = ({ feature, userFeatures }) => {
    const date = new Date(feature.date).toLocaleDateString();
    const { editSubscriptions } = useSubscriptions();

    return(
        <Flex className={styles.dashboard_feature}>
            <div className={styles.dashboard_data}>
                {feature.name}
            </div>
            <div className={styles.dashboard_data}>
                {date}
            </div>
            <input className={styles.dashboard_data} 
                    type="checkbox" style={{width:"10%"}}
                    checked={!!userFeatures && userFeatures.some(ft => ft._id === feature._id)}
                    onChange={(e) => 
                        { editSubscriptions(e.target.checked, feature, userFeatures)}
                        }/>
        </Flex>
    );
};

export default Feature;