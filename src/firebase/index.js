import "firebase/compat/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";
import firebaseConfig from "./config";


const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
firebase.analytics(app);

export { auth, db }
export default firebase;




