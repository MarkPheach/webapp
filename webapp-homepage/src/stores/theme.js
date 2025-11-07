import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

export const useTheme = defineStore("theme", () => {
  const themes = ref([]);

  // 📥 ฟังก์ชันดึงข้อมูลจาก Firestore
  async function fetchThemes() {
    const querySnapshot = await getDocs(collection(db, "themes"));
    themes.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  // 🔁 ดึงข้อมูลอัตโนมัติเมื่อ store ถูกใช้ครั้งแรก
  onMounted(fetchThemes);

  return { themes, fetchThemes };
});
