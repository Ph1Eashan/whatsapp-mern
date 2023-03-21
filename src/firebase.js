import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz_weQqEzPScX2SUVnffMhbGddXNoyMO8",
  authDomain: "whatsapp-mern-cd28d.firebaseapp.com",
  projectId: "whatsapp-mern-cd28d",
  storageBucket: "whatsapp-mern-cd28d.appspot.com",
  messagingSenderId: "940233503508",
  appId: "1:940233503508:web:ae276315e8fa49d0504801",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
