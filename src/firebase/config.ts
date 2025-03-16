import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBa4WDrrPeHBja02c9tl1-aBvPATkbJ00E",
  authDomain: "next-auth-phone.firebaseapp.com",
  projectId: "next-auth-phone",
  storageBucket: "next-auth-phone.firebasestorage.app",
  messagingSenderId: "926306459443",
  appId: "1:926306459443:web:7950e0d4846c9457172846"
};

const app = getApps().length===0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };