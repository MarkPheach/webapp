<script setup>
import { defineProps, defineEmits } from 'vue';
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,          // ควบคุม popup แสดง/ซ่อน
  targetId: String,       // id ของโพสต์ที่ให้คะแนน
  rating: Number          // คะแนนปัจจุบัน
});

const emit = defineEmits(['close', 'update:rating']);

const selectedStar = ref(props.rating || 0);

watch(() => props.rating, (val) => {
  selectedStar.value = val || 0;
});

function selectStar(star) {
  const userId = JSON.parse(localStorage.getItem("userDetail") || "{}").uid || "guest";
  if (reviewType.value === "post") {
    postStore.updatePostRating(reviewTargetId.value, userId, star);
  } else if (reviewType.value === "comment") {
    const [postId, commentIndex] = reviewTargetId.value.split("-");
    postStore.updateCommentRating(postId, commentIndex, userId, star);
  }
  selectedStar.value = star;
  hasSelected.value = true;
}


function close() {
  emit('close');
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center z-[1000] bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-lg p-6 w-[400px]">
      <h3 class="font-bold text-lg mb-4">ให้คะแนนโพสต์</h3>

      <div class="flex gap-2 mb-4">
        <button
          v-for="star in 5"
          :key="star"
          @click="selectStar(star)"
          class="px-3 py-1 rounded-full"
          :class="selectedStar === star ? 'bg-yellow-300' : 'bg-gray-200 hover:bg-gray-300'"
        >
          {{ star }}⭐
        </button>
      </div>

      <div class="flex justify-end">
        <button @click="close" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          ปิด
        </button>
      </div>
    </div>
  </div>
</template>
