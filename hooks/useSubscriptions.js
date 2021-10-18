import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";
import { UserContext } from '@utils/UserContext';
import { useNotifStore } from '../stores/useStore';

export default function useSubscriptions() {

    const { user } = useContext(UserContext);
    const queryClient = useQueryClient();
   
    const editWatched = useMutation(payload => { return axios.put(`/api/users/${user._id}`, {features: payload.features}) }, {
        onMutuate: (res, payload) => {  
            useNotifStore.setState({notif: {text: `Feature successfully ${payload.added ? "added to" : "removed from" } watchlist.`, type: "success"}});
            queryClient.setQueryData('getUser', {...user, features: payload.features });
            const previousValue = queryClient.getQueryData('getUser');
            return previousValue;
        },
        onError: (err, payload, previousValue) => {
            useNotifStore.setState({notif: {text: "Feature failed to add to watchlist.", type: "failure"}});
            queryClient.setQueryData('getUser', previousValue)
        },
        onSettled: () => queryClient.invalidateQueries('getUser')
    });
    
    const editSubscriptions = (checked, feature, userFeatures) => {
            let watchedArray = userFeatures || []; 
            if(checked) {
                watchedArray.push(feature);
            } else {
                watchedArray = watchedArray.filter(el => el._id !== feature._id);
            }
            editWatched.mutate({ features: watchedArray, added: checked });
        }

    return {
        editSubscriptions,
        editWatched
    }
}

