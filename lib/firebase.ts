import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyArnRRi1RDLS0tuKWb7wJenISzHNVf_njE",
  authDomain: "nextfire-app-451c3.firebaseapp.com",
  projectId: "nextfire-app-451c3",
  storageBucket: "nextfire-app-451c3.appspot.com",
  messagingSenderId: "440400312871",
  appId: "1:440400312871:web:bc7d80faf6e6620940ac02",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
