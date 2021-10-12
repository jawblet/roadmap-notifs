import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";
import { UserContext } from '@utils/UserContext';

export default function useSubscriptions() {
    const { user } = useContext(UserContext);
    const queryClient = useQueryClient();

    const sendEmail = useMutation(payload => { return axios.post('/api/notifs/email', payload)});
    const sendNotif = useMutation(payload => { return axios.post('/api/notifs/', payload)});

    const editWatched = useMutation(payload => { return axios.put(`/api/users/${user._id}`, payload) }, {
        onSuccess: (res, payload) => {  
           // console.log(res);
           // console.log(payload);
            queryClient.setQueryData('getUser', {...user, payload });
            const previousValue = queryClient.getQueryData('getUser');
            return previousValue; // return in case of failure 
        },
        onError: (err, payload, previousValue) => {
            queryClient.setQueryData('getUser', previousValue)
        },
        onSettled: () => queryClient.invalidateQueries('getUser')
    });
    
    const editSubscriptions = (checked, feature, userFeatures) => {
            let watchedArray = userFeatures || []; 
            if(checked) {
                watchedArray.push(feature);
                sendNotif.mutate({user: user._id,
                                  feature: feature});
            } else {
                watchedArray = watchedArray.filter(el => el._id !== feature._id);
            }
            editWatched.mutate({ features: watchedArray });

        }

    return {
        editSubscriptions,
        editWatched
    }
}

