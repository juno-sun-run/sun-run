import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD_tBx3qX1mmQzbKhq0dZondFz4HTMjQK0",
  authDomain: "sun-run-feb5f.firebaseapp.com",
  projectId: "sun-run-feb5f",
  storageBucket: "sun-run-feb5f.appspot.com",
  messagingSenderId: "383995255223",
  appId: "1:383995255223:web:7879e1bbb6889e9f7ff032"
};

const firebase = initializeApp(firebaseConfig);

export default firebase