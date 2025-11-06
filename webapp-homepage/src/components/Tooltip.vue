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
                    <h2 class="font-bold text-lg text-gray-700">การตั้งค่าโปรไฟล์</h2>
                    <button @click="closeTooltip" class="text-black hover:text-red-500">✕</button>
                </div>

                <p class="text-sm text-gray-200 mb-1 flex items-center justify-between">
                    <span>User: <span class="text-gray-200">.....</span></span>
                    <v-icon size="16" color="gray" class="cursor-pointer hover:text-blue-500">mdi-pencil</v-icon>
                </p>

                <p class="text-sm text-gray-800 mb-1">ID: <span class="text-gray-200">673380XXX</span></p>
                <p class="text-sm text-gray-800 mb-3">Course: <span class="text-gray-200">CP_CY</span></p>

                <!-- ช่องกรอก -->
                <div class="flex items-center gap-2 mb-4">
                    <p type="text"
                        class="bg-gray-100 text-gray-700 rounded-full px-9 py-1 text-sm flex-1 outline-none border border-gray-300">
                        เปลี่ยนโปรไฟล์</p>
                    <button style="background-color:dodgerblue;"
                        class="bg-sky-900 text-black text-sm px-3 py-1 rounded-full hover:bg-sky-900">
                        เปลี่ยน
                    </button>
                </div>

                <!-- ปุ่มออก/ยืนยัน -->
                <div class="flex justify-between w-full">
                    <button class="bg-rose-400 hover:bg-rose-500 text-gray-900 px-4 py-1 rounded-lg font-semibold shadow">
                        ออก
                    </button>
                    <button class="bg-sky-400 hover:bg-sky-500 text-gray-900 px-4 py-1 rounded-lg font-semibold shadow">
                        ยืนยัน
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.tooltip-card {
  background: linear-gradient(145deg, #0f172a, #1e3a8a); /* 💎 น้ำเงินเข้มหรู */
  border-radius: 1rem;
  padding: 1.2rem;
  width: 265px;
  color: #f1f5f9;
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.4),
    inset 0 0 15px rgba(255, 255, 255, 0.05); /* เพิ่มมิติแบบ glass */
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: 9999;
  animation: fadeIn 0.25s ease-out;
  transition: all 0.25s ease;
}

/* หัวข้อ */
.tooltip-card h2 {
  color: #e0f2fe; /* ฟ้าอ่อน */
  letter-spacing: 0.5px;
}

/* เนื้อหาภายใน */
.tooltip-card p {
  color: #cbd5e1;
}

/* กล่อง input */
.tooltip-card p[type="text"] {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f8fafc;
}

/* ปุ่มทั้งหมด */
.tooltip-card button {
  transition: all 0.2s ease-in-out;
  font-weight: 600;
}

/* ปุ่ม "เปลี่ยน" */
.tooltip-card button[style] {
  background: linear-gradient(to right, #38bdf8, #2563eb);
  color: #fff !important;
  border: none;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.3);
}
.tooltip-card button[style]:hover {
  background: linear-gradient(to right, #60a5fa, #3b82f6);
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.5);
}

/* ปุ่มออก / ยืนยัน */
.tooltip-card .bg-rose-400 {
  background: linear-gradient(to right, #f87171, #ef4444);
  color: #fff;
  border: none;
}
.tooltip-card .bg-rose-400:hover {
  background: linear-gradient(to right, #fca5a5, #f87171);
  box-shadow: 0 0 10px rgba(248, 113, 113, 0.5);
}

.tooltip-card .bg-sky-400 {
  background: linear-gradient(to right, #38bdf8, #0ea5e9);
  color: #fff;
  border: none;
}
.tooltip-card .bg-sky-400:hover {
  background: linear-gradient(to right, #60a5fa, #3b82f6);
  box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
}

/* ปุ่มปิด ✕ */
.tooltip-card button.text-black {
  color: #f1f5f9;
}
.tooltip-card button.text-black:hover {
  color: #f87171;
}

/* แอนิเมชันและ fade */
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

