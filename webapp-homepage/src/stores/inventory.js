import { defineStore } from "pinia";
import { ref } from "vue";

export const useInventory = defineStore("inventory", () => {
  // คลังของผู้เล่น
  const items = ref([]);

  // ฟังก์ชันเพิ่มของเข้า inventory
  function addItem(item) {
    // ป้องกันของซ้ำ
    const exists = items.value.find((i) => i.id === item.id);
    if (!exists) {
      items.value.push(item);
    }
  }

  // ฟังก์ชันลบของออก (ถ้าต้องการ)
  function removeItem(id) {
    items.value = items.value.filter((i) => i.id !== id);
  }

  return { items, addItem, removeItem };
});
