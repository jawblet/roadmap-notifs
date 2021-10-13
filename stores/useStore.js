import create from 'zustand';

const featureStore = ((set, get) => ({
    showFeature: null
}));


const notifStore = (set => ({
    notif: null, 
}));

export const useNotifStore = create(notifStore);
export const useFeatureStore = create(featureStore);

