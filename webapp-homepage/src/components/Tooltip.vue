<script setup>
import { ref, onUnmounted, nextTick } from 'vue'
import { computePosition, offset, flip, shift, autoUpdate } from '@floating-ui/dom'

// 🧩 props
const props = defineProps({
    placement: { type: String, default: 'right' } // tooltip ขึ้นด้านขวา
})

// refs
const reference = ref(null)
const tooltip = ref(null)
const isOpen = ref(false)
let cleanup = null

// 🟢 toggle tooltip
async function toggleTooltip() {
    isOpen.value = !isOpen.value

    if (isOpen.value) {
        await nextTick()
        cleanup = autoUpdate(reference.value, tooltip.value, updatePosition)
        updatePosition()
        document.addEventListener('click', handleClickOutside)
    } else {
        closeTooltip()
    }
}

// 🔵 ปิด tooltip
function closeTooltip() {
    isOpen.value = false
    if (cleanup) {
        cleanup()
        cleanup = null
    }
    document.removeEventListener('click', handleClickOutside)
}

// 🔴 ปิดถ้าคลิกข้างนอก
function handleClickOutside(event) {
    if (
        tooltip.value &&
        !tooltip.value.contains(event.target) &&
        !reference.value.contains(event.target)
    ) {
        closeTooltip()
    }
}

// 📍 คำนวณตำแหน่ง tooltip
async function updatePosition() {
    if (!reference.value || !tooltip.value) return

    const { x, y } = await computePosition(reference.value, tooltip.value, {
        placement: props.placement,
        middleware: [offset({ mainAxis: 12, crossAxis: 55 }), flip(), shift({ padding: 8 })],
    })

    Object.assign(tooltip.value.style, {
        left: `${x}px`,
        top: `${y}px`,
    })
}

onUnmounted(() => {
    closeTooltip()
})
</script>

<template>
    <div class="relative inline-block">
        <!-- 🔘 element ที่กดเพื่อเปิด tooltip -->
        <div ref="reference" @click="toggleTooltip" class="cursor-pointer">
            <slot />
        </div>

        <!-- 🧊 tooltip card -->
        <transition name="fade">
            <div v-if="isOpen" ref="tooltip" class="tooltip-card" style="position: fixed; transform: translate(0,0);">
                <div class="flex justify-between items-center mb-2">
                    <h2 class="font-bold text-lg text-black">การตั้งค่า</h2>
                    <button @click="closeTooltip" class="text-black hover:text-red-500">✕</button>
                </div>

                <p class="text-sm text-gray-800 mb-1 flex items-center justify-between">
                    <span>User: <span class="text-gray-600">.....</span></span>
                    <v-icon size="16" color="gray" class="cursor-pointer hover:text-blue-500">mdi-pencil</v-icon>
                </p>

                <p class="text-sm text-gray-800 mb-1">ID: <span class="text-gray-600">673380XXX</span></p>
                <p class="text-sm text-gray-800 mb-3">Course: <span class="text-gray-600">CP_CY</span></p>

                <!-- ช่องกรอก -->
                <div class="flex items-center gap-2 mb-4">
                    <p type="text"
                        class="bg-gray-100 text-black rounded-full px-9 py-1 text-sm flex-1 outline-none border border-gray-300">
                        เปลี่ยนโปรไฟล์</p>
                    <button style="background-color:dodgerblue;"
                        class="bg-sky-900 text-black text-sm px-3 py-1 rounded-full hover:bg-sky-900">
                        เปลี่ยน
                    </button>
                </div>

                <!-- ปุ่มออก/ยืนยัน -->
                <div class="flex justify-between w-full">
                    <button class="bg-rose-400 hover:bg-rose-500 text-black px-4 py-1 rounded-lg font-semibold shadow">
                        ออก
                    </button>
                    <button class="bg-sky-400 hover:bg-sky-500 text-black px-4 py-1 rounded-lg font-semibold shadow">
                        ยืนยัน
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.tooltip-card {
    background: linear-gradient(to bottom right, #f9fbff, #cfe8ff);
    border-radius: 1rem;
    padding: 1.2rem;
    width: 265px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    /* อยู่บนสุด */
    animation: fadeIn 0.25s ease-out;
}

/* เอฟเฟกต์แอนิเมชัน */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* เอฟเฟกต์ fade ตอนเข้า/ออก */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
