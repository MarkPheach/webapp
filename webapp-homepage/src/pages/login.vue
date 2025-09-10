<script setup>
</script>

<template>
  <div class="flex justify-between">
    <!-- Left Block -->
    <div class="h-screen flex items-center justify-center w-3/5 bg-sky-400">
      <!-- เพิ่ม class "flex-col" ตรงนี้ครับ -->
      <div class="flex flex-col items-center">
        <h1 class="block text-2xl font-bold mb-2">Welcome to CY PROJECT!</h1>
        <p class="text-gray-600">This is the place you are going to login.</p>
      </div>
    </div>

    <!-- Right Block -->
    <div class="flex flex-col bg-white minh-full w-2/5 items-center justify-center">
      <img
        src="../assets/1.-official-logo-2022-26.png"
        alt="Umamusume Logo"
      />

      <form
        class="block auth-form bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-auto mt-10 border border-blue-100 "
      >
        <div class="input-group mb-4">
          <input
            type="text"
            placeholder="Username"
            class="input-field w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
          />
        </div>

        <div class="input-group mb-4">
          <input
            type="password"
            placeholder="Password"
            class="input-field w-full px-4 py-3 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition duration-200"
          />
        </div>

        <!-- Remember + Forgot -->
        <div class="options-row flex justify-between items-center mb-6">
          <label class="remember-me flex items-center text-blue-800">
            <input
              type="checkbox"
              class="mr-2 rounded text-blue-500 focus:ring-blue-400"
            />
            Remember me
          </label>
          <a
            href="#"
            class="forgot-link text-blue-500 hover:text-blue-700 transition duration-200"
            >Forgot password?</a
          >
        </div>

        <div class="button-group space-y-4">
          <router-link to="/" class="block">
            <button
              type="submit"
              class="btn primary-btn w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow hover:shadow-md"
            >
              Login
            </button>
          </router-link>

          <router-link to="/signup" class="block">
            <button
              type="button"
              class="btn secondary-btn w-full bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Sign Up
            </button>
          </router-link>

          <div class="text-center py-3">
            <label class="text-gray-500 text-sm">or login with</label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>