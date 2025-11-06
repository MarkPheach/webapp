import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase.js";

export const usePost = defineStore("post", () => {
  const posts = ref([]);

  const fetchPosts = () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      posts.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  };

  const insertPost = async (newPostData) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userDetail") || "{}");
      const newPost = {
        email: storedUser.email,
        title: newPostData.title || "ไม่มีหัวข้อ",
        detail: newPostData.detail || "",
        review: 0,
        comment: [],
        ratings: { post: {}, comment: {} }, // 🔹 เพิ่ม ratings
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "posts"), newPost);
    } catch (err) {
      console.error(err);
    }
  };

const addComment = async (postId, commentText) => {
  try {
    // 📦 ดึงข้อมูล user จาก localStorage
    const storedUser = JSON.parse(localStorage.getItem("userDetail") || "{}");

    // ใช้ studentID จาก localStorage โดยตรง
    const studentID = storedUser.studentID || "anonymous";

    // ⏰ เวลาโพสต์
    const now = new Date();
    const timeString = now.toLocaleString("th-TH", {
      dateStyle: "short",
      timeStyle: "short",
    });

    // 🔹 สร้าง comment object ที่มี studentID
    const commentData = {
      user: studentID,      // 👈 เอา studentID มาแทน user
      text: commentText,
      createdAt: timeString,
    };

    // 🔥 บันทึกลง Firestore
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comment: arrayUnion(commentData),
    });
  } catch (err) {
    console.error("❌ Error adding comment:", err);
  }
};

  // 🔹 เพิ่มฟังก์ชัน update rating
  const updatePostRating = async (postId, userId, star) => {
    const postRef = doc(db, "posts", postId);
    const post = posts.value.find((p) => p.id === postId);
    if (!post.ratings) post.ratings = { post: {}, comment: {} };
    const newRatings = { ...post.ratings.post, [userId]: star };
    await updateDoc(postRef, {
      "ratings.post": newRatings,
    });
  };

  const updateCommentRating = async (postId, commentIndex, userId, star) => {
    const postRef = doc(db, "posts", postId);
    const post = posts.value.find((p) => p.id === postId);
    if (!post.ratings) post.ratings = { post: {}, comment: {} };
    const commentRatings = { ...post.ratings.comment[commentIndex], [userId]: star };
    const newCommentRatings = { ...post.ratings.comment, [commentIndex]: commentRatings };
    await updateDoc(postRef, {
      "ratings.comment": newCommentRatings,
    });
  };

  const filteredPosts = computed(() => posts.value);

  return {
    posts,
    filteredPosts,
    fetchPosts,
    insertPost,
    addComment,
    updatePostRating,
    updateCommentRating,
  };
});
