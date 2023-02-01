import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCuuZE1MpWq094VRyJ61zmfndIUhQrU2GE",
  authDomain: "shell-project-4e7d7.firebaseapp.com",
  projectId: "shell-project-4e7d7",
  storageBucket: "shell-project-4e7d7.appspot.com",
  messagingSenderId: "914139640740",
  appId: "1:914139640740:web:ab4422cbabef6f202a0731",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
