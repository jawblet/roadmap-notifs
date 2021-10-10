import axios from 'axios';
import { getSession } from "next-auth/react";

export const checkUser = async () => {
    const session = await getSession();
    const { email } = session.user;
    const res = await axios.get('/api/users/check', {params: { email }});
    return res.data
}

export const getFeatures = async () => {
    const res = await axios.get('/api/features', {params: {hasDate: true}});
    return res.data;
}

export const getInitFeatures = async () => {
    await axios.get('/api/features', {params: {hasDate: true}})
        .then(res => {
            console.log(res)
            return res.features })
        .catch(err => console.log(err));
}
