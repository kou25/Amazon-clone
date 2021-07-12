
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCIZap0LT6p3_1A7ioVrb4YTa0LD-r5Oiw",
    authDomain: "clone-f29ea.firebaseapp.com",
    projectId: "clone-f29ea",
    storageBucket: "clone-f29ea.appspot.com",
    messagingSenderId: "603328262372",
    appId: "1:603328262372:web:f2c5227efef9a0a978bcf1"
  };

  const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const db = app.firestore();