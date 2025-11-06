// src/stores/chibi.js
import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

export const useChibi = defineStore("chibi", () => {
  const chibis = ref([]);

  // 📥 ฟังก์ชันดึงข้อมูลจาก Firestore
  async function fetchChibis() {
    const querySnapshot = await getDocs(collection(db, "chibis"));
    chibis.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  // 🔁 ดึงข้อมูลอัตโนมัติเมื่อ store ถูกใช้ครั้งแรก
  onMounted(fetchChibis);

  return { chibis, fetchChibis };
});
