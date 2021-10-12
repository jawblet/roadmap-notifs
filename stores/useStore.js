import create from 'zustand';

const store = (set => ({
    notif: null, 
}));

export const useNotifStore = create(store);
