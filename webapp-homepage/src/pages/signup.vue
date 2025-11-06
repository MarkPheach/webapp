<script setup>
import { reactive } from 'vue';
import router from '../router';
import { useUserStore } from '../stores/User.js';
import LoginSlider from "../components/LoginSlider.vue";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";


// slides ที่ส่งให้ LoginSlider
const slides = [
  { id: 1, image: "/src/assets/login1.png" },
  { id: 2, image: "/src/assets/login2.png" },
  { id: 3, image: "/src/assets/login3.png" },
  { id: 4, image: "/src/assets/login4.png" },
  { id: 5, image: "/src/assets/sensei_Umazing.png"},
  { id: 6, image: "/src/assets/sensei_Omai wa zako.png" },
  { id: 7, image: "/src/assets/senseI_chatGPT.png" },
];

const user = reactive({
  userid: "",
  useremail: "",
  userpassword: "",
  confirmPassword: "",
  userfact: "",
});

const userStore = useUserStore();

const updatedsignupuser = async (e) => {
  e.preventDefault();

  if (user.userpassword !== user.confirmPassword) {
    alert("รหัสผ่านไม่ตรงกัน");
    return;
  }

  try {
    // สร้าง user ใน Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.useremail,
      user.userpassword
    );
    const uid = userCredential.user.uid;

    // เก็บข้อมูลเพิ่มเติมใน Firestore
// เก็บข้อมูลเพิ่มเติมใน Firestore (แบบมี subcollection)
    await setDoc(
      doc(collection(db, `users/${uid}/userDetail`), "info"),
      {
        email: user.useremail,
        studentID: user.userid,
        major: user.userfact,
        role: "เด็กกระโปก"
      }
    );


    alert("สมัครสมาชิกเรียบร้อย!");
    
    // เก็บข้อมูลใน store
    userStore.setUser({
      id: user.userid,
      email: user.useremail,
      password: user.userpassword,
      fact: user.userfact,
    });

    router.push("/login");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
</script>

<template>
  <div class="flex h-screen">
    <!-- Left Block -->
    <div class="w-3/5 h-full">
      <LoginSlider :slides="slides" class="h-full w-full" />
    </div>

    <!-- Right Block -->
    <div class="flex flex-col bg-white min-h-full w-2/5 items-center justify-center relative">
      <div class="w-1/33 absolute inset-0 flex">
        <div
          v-for="i in 4"
          :key="i"
          class="flex-1"
          :class="i % 2 === 0 ? 'bg-blue-400' : 'bg-white'"
        ></div>
      </div>

      <!-- Back Button -->
      <router-link
        to="/login"
        class="absolute top-6 left-6 text-blue-500 hover:text-blue-700 transition duration-200"
      >
        ← Back
      </router-link>

      <!-- Form -->
      <form
        @submit="updatedsignupuser"
        class="block bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-auto mt-10 border border-blue-100"
      >
        <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <!-- Student ID -->
        <div class="mb-4">
          <input
            v-model="user.userid"
            type="text"
            placeholder="รหัสนักศึกษา"
            class="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            required
          />
        </div>

        <!-- KKUMail -->
        <div class="mb-4">
          <input
            v-model="user.useremail"
            type="email"
            placeholder="KKUMail"
            class="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-4">
          <input
            v-model="user.userpassword"
            type="password"
            placeholder="รหัสผ่าน"
            class="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            required
          />
        </div>

        <!-- Confirm Password -->
        <div class="mb-4">
          <input
            v-model="user.confirmPassword"
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            class="w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            required
          />
        </div>

        <!-- Select Major -->
        <div class="mb-6">
          <select
            v-model="user.userfact"
            class="w-full px-4 py-3 rounded-lg border border-blue-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
            required
          >
            <option value="" disabled>เลือกสาขา</option>
            <option value="CS">CS</option>
            <option value="CY">CY</option>
            <option value="AI">AI</option>
            <option value="IT">IT</option>
            <option value="GIS">GIS</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="space-y-4">
          <button
            type="submit"
            class="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Sign Up
          </button>

          <router-link to="/login" class="block">
            <button
              type="button"
              class="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Already have an account? Login
            </button>
          </router-link>

          <div class="text-center py-3">
            <label class="text-gray-500 text-sm">or sign up with</label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
