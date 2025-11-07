import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

export const useProfileFrameStore = defineStore("profileFrame", () => {
  const profileFrames = ref([]);

  // 📥 ฟังก์ชันดึงข้อมูลจาก Firestore
  async function fetchProfileFrames() {
    const querySnapshot = await getDocs(collection(db, "profileFrames"));
    profileFrames.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  // 🔁 ดึงข้อมูลอัตโนมัติเมื่อ store ถูกใช้ครั้งแรก
  onMounted(fetchProfileFrames);

  return { profileFrames, fetchProfileFrames };
});
