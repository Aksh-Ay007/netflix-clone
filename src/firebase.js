import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Make sure to include this for styling

const firebaseConfig = {
  apiKey: "AIzaSyDUgl18tn42fPrM5JBRgQNECGIIiNuqv9A",
  authDomain: "netflix-clone-7d619.firebaseapp.com",
  projectId: "netflix-clone-7d619",
  storageBucket: "netflix-clone-7d619.appspot.com",
  messagingSenderId: "694253707663",
  appId: "1:694253707663:web:a002bd4ad3e5c924cd6bfa",
  measurementId: "G-YJDZZXZ176"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function (For new users)
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Save user to Firestore
    await addDoc(collection(db, 'user'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    
    toast.success("Signup successful!");  // Display success message
  } catch (error) {
    console.log(error);

    // Provide a clearer error message
    if (error.code === 'auth/email-already-in-use') {
      toast.error('Email already in use. Please log in instead.');  // Display error message
    } else {
      toast.error(error.message);  // Display generic error message
    }
  }
}

// Login function (For existing users)
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");  // Display success message
  } catch (error) {
    console.log(error);

    // Provide clearer error messages based on error type
    if (error.code === 'auth/user-not-found') {
      toast.error('No user found with this email. Please sign up.');
    } else if (error.code === 'auth/wrong-password') {
      toast.error('Incorrect password. Please try again.');
    } else {
      toast.error(error.message);  // Display generic error message
    }
  }
}

// Logout function
const logout = () => {
  signOut(auth)
    .then(() => {
      toast.success("Logged out successfully!");  // Display success message
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      toast.error("Error signing out: " + error.message);  // Display error message
    });
}

export { auth, db, login, signup, logout };
