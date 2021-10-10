import { useContext } from 'react'; 
import { UserContext } from '@utils/UserContext';
import Loading from "@components/Loading";
import Feature from '../components/dashboard/Feature';
import useSubscriptions from '../hooks/useSubscriptions';

const Watching = (props) => {
    const { user } = useContext(UserContext);
    const { editWatched } = useSubscriptions();

    if(!user) return <Loading/>
    console.log(props);
    return (
        <div>
            {!user.features 
            ? <h2>No watched features.</h2>
            : <div> 
                {user.features.map(el => {
                    return(
                        <Feature key={el._id} feature={el}/>
                        )
                    })}
                <button onClick={() => editWatched.mutate({features: []})}>
                    Stop watching all features
                </button>
            </div> 
            }
        </div>
    );
};

export default Watching;