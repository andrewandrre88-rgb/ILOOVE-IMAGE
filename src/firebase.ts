import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp, getDocFromServer, collection, addDoc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
// @ts-ignore
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
export const googleProvider = new GoogleAuthProvider();

// Connection test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
    // Skip logging for other errors, as this is simply a connection test.
  }
}
testConnection();

// Auth functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/popup-blocked') {
      // Fallback to redirect if popup is blocked
      await signInWithRedirect(auth, googleProvider);
      return null; // The page will redirect, so we don't return a user yet
    }
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Handle redirect result
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      // Create/update user document in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
        });
      }
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error handling redirect result:', error);
    return null;
  }
};

export const logout = () => signOut(auth);

// History functions
export const saveUserHistory = async (userId: string, tool: string, fileName: string, action: string) => {
  if (!userId) return;
  try {
    const historyRef = collection(db, 'users', userId, 'history');
    await addDoc(historyRef, {
      tool,
      fileName,
      action,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

export const getUserHistory = async (userId: string) => {
  if (!userId) return [];
  try {
    const historyRef = collection(db, 'users', userId, 'history');
    const q = query(historyRef, orderBy('timestamp', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

// Helper for auth state
export const useAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
