import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {getFirestore} from "@firebase/firestore";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDID,
    appId: process.env.REACT_APP_APPID,
});
export const auth = app.auth();
export const db = getFirestore(app);
export default app;
