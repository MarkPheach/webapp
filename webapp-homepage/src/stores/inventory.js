// src/stores/inventory.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useInventoryStore = defineStore("inventory", () => {
  const profileFrames = ref([]);
  const themes = ref([]);
  const chibis = ref([]);

  function addItem(item) {
    const targetArray =
      item.type === "Profileframe"
        ? profileFrames.value
        : item.type === "theme"
        ? themes.value
        : chibis.value;

    const exists = targetArray.some((i) => i.id === item.id);
    if (!exists) targetArray.push(item);
  }

  function removeItem(type, id) {
    const targetArray =
      type === "Profileframe"
        ? profileFrames.value
        : type === "theme"
        ? themes.value
        : chibis.value;
    const index = targetArray.findIndex((i) => i.id === id);
    if (index !== -1) targetArray.splice(index, 1);
  }

  return { profileFrames, themes, chibis, addItem, removeItem };
});
