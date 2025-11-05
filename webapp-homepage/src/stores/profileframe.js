import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useProfileFrameStore = defineStore('profileframe', () => {
    const ProfileFrame = ref([
        {
            id: 1,
            name: 'Profileframe1',
            src: '../../public/images/profileframe1.png',
            state: "ซื้อ",
            price: 50,
            type: "Profileframe",
        },
        {
            id: 2,
            name: 'Profileframe2',
            src: '../../public/images/profileframe2.png',
            state: "ซื้อ",
            price: 75,
            type: "Profileframe",
        },{
            id: 3,
            name: 'Profileframe3',
            src: '../../public/images/profileframe3.png',
            state: "ซื้อ",
            price: 100,
            type: "Profileframe",
        },
        {
            id: 4,
            name: 'Profileframe4',
            src: '../../public/images/profileframe4.png',
            state: "ซื้อ",
            price: 150,
            type: "Profileframe",
        }

    ]);
    return {ProfileFrame};
});