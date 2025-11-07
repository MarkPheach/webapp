<script setup>
import { ref, computed, onMounted } from "vue";
import "primeicons/primeicons.css";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const router = useRouter();
const point = ref(0);
const pointUsed = ref(0);
const totalPointsFromPosts = ref(0);
const pointLeft = computed(() => (point.value + totalPointsFromPosts.value) - pointUsed.value);

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userDetail");
  router.push("/login");
};

onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      router.push("/login");
      return;
    }

    // ดึง user info แบบ real-time
    const infoRef = doc(db, `users/${user.uid}/userDetail/info`);
    onSnapshot(infoRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        point.value = data.point ?? 0;
        pointUsed.value = data.pointUsed ?? 0;
      }
    });

    // รวมคะแนนจากโพสต์ (loop ผ่าน map)
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("post.email", "==", user.email));
      const querySnap = await getDocs(q);

      let postPoints = 0;
      querySnap.forEach((docSnap) => {
        const postData = docSnap.data();
        if (postData.post) {
          for (const key in postData.post) {
            const value = postData.post[key];
            if (typeof value === "number") postPoints += value;
          }
        }
      });

      totalPointsFromPosts.value = postPoints;
    } catch (err) {
      console.error(err);
    }
  });
});
</script>

<template>
  <header class="flex items-center justify-between bg-gradient-to-r from-blue-900 to-sky-600 text-white fixed top-0 left-0 w-full z-50 px-6 h-[10vh] shadow-md">
    <div class="flex items-center gap-3">
      <img src="../assets/CU_DEPT_LOGO.png" alt="Logo" class="h-[60px] w-auto rounded-2xl shadow-md bg-white p-1" />
      <h1 class="text-2xl font-semibold tracking-wide drop-shadow">CourseHub</h1>
    </div>

    <div class="flex items-center gap-4">
      <div class="relative flex items-center bg-white/90 rounded-xl px-4 py-1 shadow-sm text-black font-semibold">
        <i class="pi pi-star-fill text-yellow-500 mr-2"></i>
        <span>{{ pointLeft }}</span>
      </div>

      <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl px-5 py-2 shadow-md transition-all duration-200">
        Logout
      </button>
    </div>
  </header>
</template>
