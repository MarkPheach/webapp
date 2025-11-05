import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useProfileFrameStore = defineStore('profileframe', () => {
    const ProfileFrame = ref([
        {
            id: 1,
            name: 'Profileframe1',
            src: '../../pubkic/images/profileframe1.png',
            state: "ซื้อ",
            price: 50,
            type: "Profileframe",
        },
        {
        }

    ]);
    return {ProfileFrame};
});