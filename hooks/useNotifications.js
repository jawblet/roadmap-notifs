import { useContext} from 'react';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { UserContext } from '@utils/UserContext';
import { getNotifs } from '@utils/api';
import axios from "axios";

export default function useNotifications() {
    const { user } = useContext(UserContext);
    const queryClient = useQueryClient();

    const notifs = useQuery('getNotifs', () => getNotifs(user._id));

    const updateNotifs = useMutation(() => { return axios.put(`/api/notifs/${user._id}`)}, {
        onSuccess: () => { 
            console.log("Invalidate!");
            queryClient.invalidateQueries('getNotifs') 
        }
    });

    return {
        notifs, 
        updateNotifs
    }
}