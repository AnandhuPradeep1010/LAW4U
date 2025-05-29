// src/components/utils/saveGameProgress.js
import { db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Save the progress of a completed game to Firestore.
 * 
 * @param {string} uid - The user's unique ID.
 * @param {string} gameType - The type of game completed (e.g., "education", "protection", "survival").
 */
export const saveGameProgress = async (uid, gameType) => {
  try {
    const docRef = doc(db, "gameProgress", uid);
    const docSnap = await getDoc(docRef);

    const currentProgress = docSnap.exists() ? docSnap.data() : {};

    const updatedProgress = {
      ...currentProgress,
      [gameType]: true,
    };

    await setDoc(docRef, updatedProgress);
    console.log(`✅ Game progress saved for user: ${uid}, type: ${gameType}`);
  } catch (error) {
    console.error("❌ Error saving game progress:", error);
  }
};
