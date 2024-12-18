// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { config } from "./index.js"
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey:config.api_Key ,
  authDomain: config.auth_domain,
  projectId: config.project_id,
  storageBucket: config.storage_bucket,
  messagingSenderId: config.messaging_sender_id,
  appId: config.app_id,
  measurementId: config.measurement_id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app)
export const db=getFirestore()