<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import LoginSlider from "../components/LoginSlider.vue"

const router = useRouter()
const email = ref("")
const password = ref("")
const errorMsg = ref("")

// slides ที่ส่งให้ LoginSlider
const slides = ref([
  { id: 1, image: "/src/assets/login1.png" },
  { id: 2, image: "/src/assets/login2.png" },
  { id: 3, image: "/src/assets/login3.png" },
  { id: 4, image: "/src/assets/login4.png" },
  { id: 5, image: "/src/assets/sensei_Umazing.png" },
  { id: 6, image: "/src/assets/sensei_Omai wa zako.png" },
  { id: 7, image: "/src/assets/senseI_chatGPT.png" },
])

const login = async () => {
  errorMsg.value = ""
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )
    console.log("✅ Logged in:", userCredential.user)
    router.push("/home") // เปลี่ยนหน้าเมื่อเข้าสู่ระบบสำเร็จ
  } catch (error) {
    console.error("❌ Login failed:", error.message)
    errorMsg.value = "เข้าสู่ระบบไม่สำเร็จ: " + error.message
  }
}
</script>

<template>
  <div class="flex h-screen">
    <!-- Left Block (Slider) -->
    <div class="w-3/5 h-full">
      <LoginSlider :slides="slides" class="h-full w-full" />
    </div>

    <!-- Right Block (Login Form) -->
    <div class="relative w-2/5 flex flex-col justify-center items-center bg-white px-8 h-full">
      <div class="w-1/33 absolute inset-0 flex">
        <div
          v-for="i in 4"
          :key="i"
          class="flex-1"
          :class="i % 2 === 0 ? 'bg-blue-400' : 'bg-white'"
        ></div>
      </div>

      <div class="relative z-10 w-full flex flex-col items-center">
        <img src="../assets/KKU_LOGO.png" alt="KKU Logo" class="mb-6" />

        <!-- Login Form -->
        <form
          @submit.prevent="login"
          class="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-blue-100"
        >
          <div class="mb-4">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full px-4 py-3 rounded-lg border border-blue-200
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                     focus:outline-none transition duration-200"
              required
            />
          </div>

          <div class="mb-4">
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-lg border border-blue-200
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                     focus:outline-none transition duration-200"
              required
            />
          </div>

          <div class="flex justify-between items-center mb-6">
            <label class="flex items-center text-blue-800">
              <input type="checkbox" class="mr-2 rounded text-blue-500 focus:ring-blue-400" />
              Remember me
            </label>
            <a href="#" class="text-blue-500 hover:text-blue-700 transition duration-200">
              Forgot password?
            </a>
          </div>

          <div class="space-y-4">
            <button
              type="submit"
              class="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Login
            </button>

            <router-link to="/signup" class="block">
              <button
                type="button"
                class="w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Sign Up
              </button>
            </router-link>
          </div>

          <div class="text-center py-3">
            <label class="text-gray-500 text-sm">or login with</label>
          </div>

          <p v-if="errorMsg" class="text-red-500 mt-2 text-sm">{{ errorMsg }}</p>
        </form>
      </div>
    </div>
  </div>
</template>
