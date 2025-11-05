import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const usePost = defineStore("post", () => {
  // ------------------------
  // STATE
  // ------------------------
  const posts = ref([
    {
      id: 1,
      name: "annonymous",
      title: "Math",
      review: 4.5,
      detail: "ต้องการติวคณิตศาสตร์ ม.ปลาย",
      comment: ["อย่าติวเลย สอบไม่ผ่านอยู่แล้ว", "พี่รับครับ คืนละ 1500"],
    },
    {
      id: 2,
      name: "annonymous",
      title: "Web Programming",
      review: 2,
      detail: "ไม่ต้องการติด F",
      comment: ["ผมเป็นเก"],
    },
    {
      id: 3,
      name: "annonymous",
      title: "Math",
      review: 5,
      detail: "หาหนังสือติวคณิตสอบเข้า ม.4",
      comment: ["มาติวกับพี่ดีกว่าน้อง", "wartunder มั้ยเพื่อน"],
    },
  ]);

  // ------------------------
  // UTILITIES
  // ------------------------
  const getNextId = () => {
    if (posts.value.length === 0) return 1;
    const maxId = Math.max(...posts.value.map((p) => p.id));
    return maxId + 1;
  };

  // ------------------------
  // ACTIONS
  // ------------------------
  const insertPost = (newPostData) => {
    const newId = getNextId();

    const newPost = {
      id: newId,
      name: newPostData.name || "annonymous",
      title: newPostData.title || "ไม่มีหัวข้อ",
      review: 0,
      detail: newPostData.detail || "",
      comment: [],
      createdAt: newPostData.createdAt || new Date().toISOString(), // ✅ เพิ่มเวลาโพสต์
    };

    posts.value.push(newPost);
    console.log(
      `✅ Post ID: ${newId} ถูกเพิ่มแล้ว เวลาโพสต์: ${newPost.createdAt}`
    );
  };

  const addComment = (postId, comment) => {
    const post = posts.value.find((p) => p.id === postId);
    if (post) {
      post.comment.push(comment);
    } else {
      console.warn(`❌ Post ID: ${postId} not found`);
    }
  };

  // ------------------------
  // FILTERS (Computed)
  // ------------------------
  const selectedSubject = ref("ทั้งหมด"); // default
  const minRating = ref(0);

  const filteredPosts = computed(() => {
    return posts.value.filter((p) => {
      const subjectMatch =
        selectedSubject.value === "ทั้งหมด" ||
        p.title === selectedSubject.value;
      const ratingMatch = p.review >= minRating.value;
      return subjectMatch && ratingMatch;
    });
  });

  // ------------------------
  // EXPORT
  // ------------------------
  return {
    posts,
    filteredPosts,
    selectedSubject,
    minRating,
    insertPost,
    addComment,
  };
});
