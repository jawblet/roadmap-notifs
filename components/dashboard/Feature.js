import { Modal } from "../Modal";
import Flex from "@utils/Flex";
import styles from "@styles/Dashboard.module.scss";
import useSubscriptions from '@hooks/useSubscriptions';
import { useFeatureStore } from 'stores/useStore';
import LinkToAirtable from "./LinkToAirtable";

const Feature = ({ feature, userFeatures }) => {
    const date = new Date(feature.date).toLocaleDateString();
    const { editSubscriptions } = useSubscriptions();
    const { showFeature } = useFeatureStore();

    return( <>
        <Flex className={styles.dashboard_feature}>
            <Flex middle gap={0.5} className={styles.dashboard_data}>
                <p onClick={() => useFeatureStore.setState({showFeature: feature})}>
                    {feature.name}
                </p>
                <LinkToAirtable id={feature.id}/>
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
                {showFeature && <Modal/>}
        </Flex>
        </>
    );
};

export default Feature;