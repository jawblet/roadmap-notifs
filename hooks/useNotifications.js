import { useQuery } from "react-query";

export default function useNotifications() {
    const { isLoading, error, data } = useQuery('getFeatures', () => getFeatures());

    return {
        notifs
    }
}