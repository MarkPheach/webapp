<script setup>
import { ref } from 'vue';
import ProfileCard from '../InfoCard/ProfileCard.vue';
const openSubmenu1_1 = ref(false);
const openSubmenu1_2 = ref(false);
const openSubmenu2_1 = ref(false);
const openSubmenu2_2 = ref(false);
const openSubmenu3_1 = ref(false);
const openSubmenu3_2 = ref(false);
const openSubmenu4_1 = ref(false);
const openSubmenu4_2 = ref(false);

</script>
<template>
    <aside class="w-65 bg-white text-gray-800 min-h-screen shadow-md p-5">
        <profile-card />
        <h2 class="text-2xl font-bold mb-6">Menu</h2>
        <ul class="space-y-2">
            <li>
                <button @click="openSubmenu1_1 = !openSubmenu1_1"
                    class="block w-full text-left p-2 rounded hover:bg-gray-100">
                    ชั้นปีที่ 1 เทอม 1
                </button>
                <ul v-if="openSubmenu1_1" class="pl-4 mt-2 space-y-1">
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 1 </a></li>
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 2 </a></li>
                </ul>
            </li>
            <li>
                <button @click="openSubmenu1_2 = !openSubmenu1_2"
                    class="block w-full text-left p-2 rounded hover:bg-gray-100">
                    ชั้นปีที่ 1 เทอม 2
                </button>
                <ul v-if="openSubmenu1_2" class="pl-4 mt-2 space-y-1">
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 1 </a></li>
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 2 </a></li>
                </ul>
            </li>
            <li>
                <button @click="openSubmenu2_1 = !openSubmenu2_1"
                    class="block w-full text-left p-2 rounded hover:bg-gray-100">
                    ชั้นปีที่ 2 เทอม 1
                </button>
                <ul v-if="openSubmenu2_1" class="pl-4 mt-2 space-y-1">
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 1 </a></li>
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 2 </a></li>
                </ul>
            </li>
            <li>
                <button @click="openSubmenu2_2 = !openSubmenu2_2"
                    class="block w-full text-left p-2 rounded hover:bg-gray-100">
                    ชั้นปีที่ 2 เทอม 2
                </button>
                <ul v-if="openSubmenu2_2" class="pl-4 mt-2 space-y-1">
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 1 </a></li>
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 2 </a></li>
                </ul>
            </li>
            <li>
                <button @click="openSubmenu3_1 = !openSubmenu3_1"
                    class="block w-full text-left p-2 rounded hover:bg-gray-100">
                    ชั้นปีที่ 3 เทอม 1
                </button>
                <ul v-if="openSubmenu3_1" class="pl-4 mt-2 space-y-1">
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 1 </a></li>
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 2 </a></li>
                </ul>
            </li>
            <li>
                <button @click="openSubmenu3_2 = !openSubmenu3_2"
                    class="block w-full text-left p-2 rounded hover:bg-gray-100">
                    ชั้นปีที่ 3 เทอม 2
                </button>
                <ul v-if="openSubmenu3_2" class="pl-4 mt-2 space-y-1">
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 1 </a></li>
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 2 </a></li>
                </ul>
            </li>
            <li>
                <button @click="openSubmenu4_1 = !openSubmenu4_1"
                    class="block w-full text-left p-2 rounded hover:bg-gray-100">
                    ชั้นปีที่ 4 เทอม 1
                </button>
                <ul v-if="openSubmenu4_1" class="pl-4 mt-2 space-y-1">
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 1 </a></li>
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 2 </a></li>
                </ul>
            </li>
            <li>
                <button @click="openSubmenu4_2 = !openSubmenu4_2"
                    class="block w-full text-left p-2 rounded hover:bg-gray-100">
                    ชั้นปีที่ 4 เทอม 2
                </button>
                <ul v-if="openSubmenu4_2" class="pl-4 mt-2 space-y-1">
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 1 </a></li>
                    <li><a class="block p-1 hover:bg-gray-200 rounded">วิชา 2 </a></li>
                </ul>
            </li>
        </ul>
    </aside>
</template>