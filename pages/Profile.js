import { useContext } from 'react'; 
import { UserContext } from '@utils/UserContext';
import Loading from "@components/Loading";
import Feature from '@components/dashboard/Feature';
import useSubscriptions from '@hooks/useSubscriptions';
import Flex from "@utils/Flex";
import { useNotifStore } from 'stores/useStore';
import Banner from '@components/Banner';

const Profile = (props) => {
    const { user } = useContext(UserContext);
    const { editWatched } = useSubscriptions();
    const { notif } = useNotifStore();


    if(!user) return <Loading/>
    console.log(user);
    return ( <>
        {notif && <Banner/>}
        <Flex column gap={1}>
            <h2>{user.name}</h2>
            {!user.features.length 
            ? <h4>No watched features.</h4>
            : <div> 
                <h3>My watched features:</h3>
                {user.features.map(el => {
                    return(
                        <Feature key={el._id} feature={el}/>
                        )
                    })}
                <button onClick={() => editWatched.mutate({features: [], removed: true})} className="button blue">
                    Stop watching all features
                </button>
            </div> 
            }
        </Flex>
        </>
    );
};

export default Profile;