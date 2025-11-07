import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export function useUserPoints() {
  const calculatePoints = () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();

      onAuthStateChanged(auth, async (user) => {
        if (!user) return reject("No user logged in");

        try {
          const userRef = doc(db, `users/${user.uid}/userDetail/info`);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) return resolve(0);

          const userData = userSnap.data();
          let totalPoints = 0;

          const postsRef = collection(db, "posts");
          const q = query(postsRef, where("post.email", "==", userData.email));
          const querySnap = await getDocs(q);

          querySnap.forEach((docSnap) => {
            const postData = docSnap.data();
            if (postData.post) {
              // loop ผ่านทุก key ใน map
              for (const key in postData.post) {
                const value = postData.post[key];
                if (typeof value === "number") totalPoints += value;
              }
            }
          });

          resolve(totalPoints);
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  return { calculatePoints };
}
