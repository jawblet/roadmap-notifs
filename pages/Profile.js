import { useContext } from 'react'; 
import { UserContext } from '@utils/UserContext';
import Loading from "@components/Loading";
import Feature from '@components/dashboard/Feature';
import useSubscriptions from '@hooks/useSubscriptions';
import Flex from "@utils/Flex";
import { useNotifStore } from 'stores/useStore';
import Banner from '@components/Banner';
import styles from "@styles/Dashboard.module.scss";

const ProfilePage = (props) => {
    const { user } = useContext(UserContext);
    const { editWatched } = useSubscriptions();

    if(!user) return <Loading/>

    return ( <>
            <h2>{user.name}</h2>
            {!user.features.length 
            ? <h4>No watched features.</h4>
            : <div> 
                <h3 style={{paddingBottom:"1rem", fontWeight:"bold"}}>
                    My watched features
                </h3>
                {user.features.map(el => {
                    return(
                        <Feature key={el._id} feature={el} userFeatures={user.features}/>
                        )
                    })}
                <button onClick={() => editWatched.mutate({features: [], removed: true})} className="button blue">
                    Stop watching all features
                </button>
            </div> 
            }
        </>
    );
};

const profile = () => {
    const { notif } = useNotifStore();

    return (
    <>
        {notif && <Banner/>}
        <Flex column gap={1.5} className={styles.dashboard}>
            <ProfilePage/>
        </Flex>
    </>
    )
}

export default profile;