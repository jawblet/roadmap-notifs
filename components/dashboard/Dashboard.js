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
