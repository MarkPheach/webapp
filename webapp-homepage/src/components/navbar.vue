<script setup>
</script>

<template>
    <nav class="bg-blue-300 sticky top-0 left-0 w- z-50 h-[10vh] flex justify-between items-center pr-16">
        <!-- Logo -->
        <div class="h-full w-auto bg-white">
            <img src="../assets/CU_DEPT_LOGO.png" alt="kku logo" class="h-full w-auto">
        </div>
        <!-- Search bar -->
        <div class="flex h-full w-1/5 items-center justify-center">
            <input type="text" placeholder="  search here." class="h-1/2 w-full item-center bg-white rounded-lg">
        </div>
        <!-- button -->
        <div class="flex justify-between h-full w-1/8 items-center">
            <!-- price -->
            <button class="bg-white rounded-xl w-24 h-1/2 hover:bg-gray-500">price : 110</button>
            <!-- log out -->
            <button class="bg-white rounded-2xl w-16 h-1/2 float-right hover:text-gray-500">log out</button>
        </div>
    </nav>
</template>