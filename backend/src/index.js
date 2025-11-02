const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("../key/cp422021-673380167-8-firebase-adminsdk-fbsvc-994de138ad.json");
const bcrypt = require("bcrypt"); 
const saltrounds = 5;
const app = express();
const port = 3001;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const USERS_COLLECTION = 'Account';

app.use(bodyParser.json());

// Register endpoint
app.post("/register", async (req, res) => {
  const { userName, password } = req.body; 
  if (!userName || !password) {
      return res.status(400).json({ success: false, message: "Username and password required." });
  }
  try {
    const userSnapshot = await db.collection(USERS_COLLECTION).where('UserName', '==', userName).get();
    if (!userSnapshot.empty) {
        return res.status(409).json({ success: false, message: "Username already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    const docRef = await db.collection(USERS_COLLECTION).add({
      UserName: userName,
      Password: hashedPassword,
    });
    
    res.status(201).json({ success: true, message: "Register success.", docId: docRef.id });
  } catch (error) {
    console.error("Registration Error:", error); 
    res.status(500).json({ success: false, message: "Register failed due to server error." });
  }
});
// Login endpoint
app.post("/login", async (req, res) => {
    const { userName, password } = req.body; 

    if (!userName || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required." });
    }
    try {
        const userSnapshot = await db.collection(USERS_COLLECTION)
                                     .where('UserName', '==', userName)
                                     .limit(1)
                                     .get();

        if (userSnapshot.empty) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const userData = userSnapshot.docs[0].data();
        const storedHash = userData.Password;
        const isMatch = await bcrypt.compare(password, storedHash);

        if (isMatch) {
            res.status(200).json({ 
                success: true, 
                message: "Login successful"
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials." });
        }
    } catch (error) {
        console.error("Login attempt error:", error);
        return res.status(500).json({ success: false, message: "Server error during authentication." });
    }
});

// post review and comment endpoints
app.get("/post", async (req, res) => {
  try {
    const postsSnapshot = await db.collection('post').get();
    const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch posts." });
  }
});
app.post("/post", async (req, res) => {
  const { poster, title, detail } = req.body;
  if (!poster || !title || !detail) {
    return res.status(400).json({ success: false, message: "poster title and detail are required." });
  }
  try {
    const newPost = {
      poster,
      title,
      detail,
      review: 0,
      comment: []
    };
    const docRef = await db.collection('post').add(newPost);
    res.status(201).json({ success: true, message: "Post created successfully.", postId: docRef.id });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, message: "Failed to create post." });
  }
});
app.post("/post/review", async (req, res) => {
  const { postId, increment } = req.body;
  if (!postId || typeof increment !== 'number') {
    return res.status(400).json({ success: false, message: "postId and increment are required." });
  }
  try {
    const postRef = db.collection('post').doc(postId);
    await postRef.update({
      review: admin.firestore.FieldValue.increment(increment)
    });
    res.status(200).json({ success: true, message: "Review updated successfully." });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ success: false, message: "Failed to update review." });
  }
});
app.post("/post/comment", async (req, res) => {
  const { postId, comment } = req.body;
  if (!postId || !comment) {
    return res.status(400).json({ success: false, message: "postId and comment are required." });
  }
  try {
    const postRef = db.collection('post').doc(postId);
    await postRef.update({
      comment: admin.firestore.FieldValue.arrayUnion(comment)
    });
    res.status(200).json({ success: true, message: "Comment added successfully." });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: "Failed to add comment." });
  }
});

// cart endpoint
app.get("/cart", async (req, res) => {
  try {
    const cartSnapshot = await db.collection('cart').get();
    const carts = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, carts });
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch carts." });
  }
});
app.post("/cart", async (req, res) => {
  const { name, price, detail } = req.body;
  if (!name || !price || !detail) {
    return res.status(400).json({ success: false, message: "name, price and detail are required." });
  }
  try {
    const newCartItem = {
      name,
      price,
      detail
    };
    const docRef = await db.collection('cart').add(newCartItem);
    res.status(201).json({ success: true, message: "Cart item added successfully.", cartId: docRef.id });
  } catch (error) {
    console.error("Error adding cart item:", error);
    res.status(500).json({ success: false, message: "Failed to add cart item." });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
