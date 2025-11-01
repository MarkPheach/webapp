<template>
  <nav class="bg-blue-300 sticky top-0 left-0 w-full z-50 h-[10vh] flex justify-between items-center pr-16">
    <!-- Logo -->
    <div class="h-full w-auto bg-white">
      <img src="../assets/CU_DEPT_LOGO.png" alt="kku logo" class="h-full w-auto">
    </div>

    <!-- Search bar -->
    <div class="flex h-full w-1/5 items-center justify-center">
      <input type="text" placeholder="search here." class="h-1/2 w-full bg-white rounded-lg">
    </div>

    <!-- Buttons -->
    <div class="flex justify-between h-full w-1/4 items-center">
      <button class="bg-white rounded-xl w-24 h-1/2 hover:bg-gray-500">price : 110</button>
      <router-link to="/login" class="block">
      <button class="bg-white rounded-2xl w-16 h-1/2 hover:text-gray-500">log out</button>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
</script>
