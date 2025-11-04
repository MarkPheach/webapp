import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useChibi = defineStore("chibi", () => {
    const chibis = ref([
        {
            id: 1,
            name: "Mutsumi with Clubcumber",
            image: "/public/chibi/Mutsumi.gif",
        },
        {
            id: 2,
            name: "adventer",
            image: "/public/chibi/adventer.gif",
        },
        {
            id: 3,
            name: "chibi-tachyon",
            image: "/public/chibi/chibi-tachyon.gif",
        },
        {
            id: 4,
            name: "uma-musume-haru-urara",
            image: "/public/chibi/uma-musume-haru-urara.gif",
        },
    ]);
    return { chibis };
});