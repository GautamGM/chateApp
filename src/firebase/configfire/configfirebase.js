// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { config } from "../index.js";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: config.AppKey,
  authDomain: config.AuthDomain,
  projectId: config.Project_id,
  storageBucket: config.StorageBuckey,
  messagingSenderId: config.MessagingSenderId,
  appId: config.Appid,
  measurementId: config.MeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app)