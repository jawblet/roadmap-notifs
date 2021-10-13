import React from 'react';
import Flex from "@utils/Flex";
import styles from "@styles/Dashboard.module.scss";
import useSubscriptions from '@hooks/useSubscriptions';
import { VscLinkExternal } from "react-icons/vsc";
import { useFeatureStore } from 'stores/useStore';

const LinkAway = ( { id }) => {
return(
    <a href={`${process.env.NEXT_PUBLIC_PROD_DB_URL}${id}`} 
        rel="noreferrer"
        target="_blank">
            <VscLinkExternal className="icon"/>
    </a>
)
}

const Feature = ({ feature, userFeatures }) => {
    const date = new Date(feature.date).toLocaleDateString();
    const { editSubscriptions } = useSubscriptions();
    const { showFeature } = useFeatureStore();

    return(
        <Flex className={styles.dashboard_feature}>
            <Flex middle gap={0.5} className={styles.dashboard_data}>
                <p onClick={() => useFeatureStore.setState({feature: feature.id})}>
                    {feature.name}
                </p>
                <LinkAway id={feature.id}/>
            </Flex>
            <div className={styles.dashboard_data}>
                <p>{date}</p>
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