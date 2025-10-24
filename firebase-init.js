// Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyAg7vpdpsDzRLC3SI4isESxVP9zebXoOpQ",
  authDomain: "myjwellery-calculator.firebaseapp.com",
  projectId: "myjwellery-calculator",
  storageBucket: "myjwellery-calculator.firebasestorage.app",
  messagingSenderId: "551104893555",
  appId: "1:551104893555:web:170a70336df8f3cbdc1006",
  measurementId: "G-NF20200WST"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth(); // Auth service ko bhi initialize karein