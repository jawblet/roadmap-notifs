import { useContext } from 'react';
import { UserContext } from '@utils/UserContext';
import Flex from '@utils/Flex';
import styles from "@styles/Dashboard.module.scss";
import Loading from '../Loading';
import Feature from './Feature';
import { colors } from '../../utils/colors';

const Dashboard = ({ data }) => {
    const { user } = useContext(UserContext);

    if(!user) return <Loading/>

    return (<>
            <div className={styles.dashboard}>
                <Flex className={styles.dashboard_header} width="100%">
                    <h5 className={styles.dashboard_th}>Product domain</h5>
                    <h5 className={styles.dashboard_th}>Feature</h5>
                    <h5 className={styles.dashboard_th}>ETA</h5>
                    <h5 className={styles.dashboard_th}>Watch?</h5>
                </Flex>
                    {Object.entries(data).map(([key, vals], i) => {
                        return(
                            <Flex className={styles.dashboard_row} key={i} top>
                                <div style={{fontWeight:"bold", textAlign:"center", background:colors[key]}} 
                                    className={`${styles.dashboard_td} inlinetag`}>
                                    {key}
                                </div>
                                <div className={styles.dashboard_td}>
                                    {vals.map(el => {
                                        return (<Feature key={el._id} 
                                                    feature={el} 
                                                    userFeatures={user.features}
                                                    />)
                                        })}
                                </div>
                            </Flex>) 
                    })}
             </div>
             </>
    );
};

export default Dashboard;

/**
 * <Flex between className={styles.tabs} width="100%">
                <h5 style={{width:"25%"}}>product domain</h5>
                <h5 style={{width:"50%"}}>name</h5>
                <h5 style={{width:"15%"}}>est. delivery date</h5>
                <h5 style={{width:"10%"}}>watch?</h5>
            </Flex>
            {Object.entries(data).map(([key, vals], i) => {
                return(
                <Flex key={i} className={styles.domain} gap={3}>
                    <h4 style={{width:"25%"}}>
                        {key}
                    </h4>
                    <div style={{width:"100%"}}>
                        {vals.map(el => {
                            const date = new Date(el.date).toLocaleDateString();
                            return (
                                <Flex key={el._id} gap={1.5} between className={styles.feature}>
                                    <p style={{width:"60%"}}>{el.name}</p>
                                    <p style={{width:"5%"}}>{date}</p>
                                    <input type="checkbox" style={{width:"10%"}}
                                        value={user.watched && user.watched.includes(el._id)}
                                        onClick={(e) => {
                                            editSubscriptions(e.target.checked, el._id, user.watched)}}/>
                                </Flex>
                                )}
                            )}
                    </div>
                </Flex>
               ) 
             })}
 */