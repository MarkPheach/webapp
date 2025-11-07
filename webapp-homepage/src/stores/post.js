// src/stores/post.js
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
  const isPost = ref(false); // ✅ state สำหรับเปิด/ปิดโพสต์

  const togglePost = () => {
    isPost.value = !isPost.value;
  };

  // 📥 ดึงโพสต์แบบเรียลไทม์
  const fetchPosts = () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      posts.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  };

  // 📝 เพิ่มโพสต์ใหม่
  const insertPost = async (newPostData) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userDetail") || "{}");
      const newPost = {
        email: storedUser.email,
        title: newPostData.title || "ไม่มีหัวข้อ",
        detail: newPostData.detail || "",
        review: 0,
        comment: [],
        ratings: { post: {}, comment: {} },
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, "posts"), newPost);
    } catch (err) {
      console.error("❌ insertPost error:", err);
    }
  };

  // 💬 เพิ่มคอมเมนต์
  const addComment = async (postId, commentText) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userDetail") || "{}");
      const studentID = storedUser.studentID || "anonymous";
      const now = new Date();
      const timeString = now.toLocaleString("th-TH", {
        dateStyle: "short",
        timeStyle: "short",
      });

      const commentData = {
        user: studentID,
        text: commentText,
        createdAt: timeString,
      };

      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        comment: arrayUnion(commentData),
      });
    } catch (err) {
      console.error("❌ addComment error:", err);
    }
  };

  // ⭐ ให้ดาวโพสต์
  const updatePostRating = async (postId, userId, star) => {
    try {
      const postRef = doc(db, "posts", postId);
      const post = posts.value.find((p) => p.id === postId);

      if (!post.ratings) post.ratings = { post: {}, comment: {} };

      const newRatings = { ...post.ratings.post, [userId]: star };

      await updateDoc(postRef, {
        "ratings.post": newRatings,
      });

      console.log(`✅ ให้ดาวโพสต์สำเร็จ: ${userId} = ${star}`);
    } catch (err) {
      console.error("❌ updatePostRating error:", err);
    }
  };

  // 💫 ให้ดาวคอมเมนต์
  const updateCommentRating = async (postId, commentIndex, userId, star) => {
    try {
      const postRef = doc(db, "posts", postId);
      const post = posts.value.find((p) => p.id === postId);

      if (!post.ratings) post.ratings = { post: {}, comment: {} };
      if (!post.ratings.comment) post.ratings.comment = {};
      if (!post.ratings.comment[commentIndex]) post.ratings.comment[commentIndex] = {};

      const commentRatings = {
        ...post.ratings.comment[commentIndex],
        [userId]: star,
      };

      const newCommentRatings = {
        ...post.ratings.comment,
        [commentIndex]: commentRatings,
      };

      await updateDoc(postRef, {
        "ratings.comment": newCommentRatings,
      });

      console.log(`✅ ให้ดาวคอมเมนต์ ${commentIndex} ของโพสต์ ${postId}: ${star}`);
    } catch (err) {
      console.error("❌ updateCommentRating error:", err);
    }
  };

  const filteredPosts = computed(() => posts.value);

  return {
    posts,
    filteredPosts,
    isPost,
    togglePost, // ✅ เพิ่มตรงนี้
    fetchPosts,
    insertPost,
    addComment,
    updatePostRating,
    updateCommentRating,
  };
});
