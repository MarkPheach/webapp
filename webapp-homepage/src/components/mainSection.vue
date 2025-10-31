<script setup>
    import { ref } from 'vue';

    const isCart = ref(true);
    const ispost = ref(false);

    function cartShow(){
        isCart.value = !isCart.value
    }
    function postShow(){
        ispost.value = !ispost.value
    }
</script>

<template>
    <!-- cart -->
    <div v-if="isCart" class="min-h-150 min-w-150 bg-sky-100 rounded-2xl shadow-2xl flex justify-center items-center fixed left-125 top-25">
        <h1>This is cart</h1>
    </div>
    <!-- post -->
    <div v-if="ispost" class="min-h-150 min-w-150 bg-sky-100 rounded-2xl shadow-2xl flex justify-center items-center fixed left-125 top-25">
        <h1>This is post</h1>
    </div>
    <!-- main -->
    <main class="min-h-[calc(100vh_-_10vh)] min-w-screen bg-sky-50">
        <!-- board -->
        <div class="flex float-right h-170 w-300 rounded-2xl bg-white shadow-2xl mr-12 mt-3">
            <!-- cart-post -->
             <button class="w-15 h-15 shadow-2xl rounded-full absolute right-25 bottom-30" @click="cartShow">cart</button>
             <button class="w-15 h-15 shadow-2xl rounded-full absolute right-25 bottom-10" @click="postShow">post</button>
        </div>
    </main>
</template>