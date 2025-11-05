import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
    const themes = ref([
        {
            id: 1,
            name: 'theme1',
            img: '../../public/images/theme1.jpg',
            state: "ซื้อ",
            price: 50,
            type: "theme",
            
        },{
            id: 2,
            name: 'theme2',
            img: '../../public/images/theme2.jpg',
            state: "ซื้อ",
            price: 50,
            type: "theme",
        },{
            id: 3,
            name: 'theme3',
            img: '../../public/images/theme3.jpg',
            state: "ซื้อ",
            price: 50,
            type: "theme",
        },{
            id: 4,
            name: 'theme4',
            img: '../../public/images/theme4.jpg',
            state: "ซื้อ",
            price: 50,
            type: "theme",
        }
    ]);
    return { themes };
});