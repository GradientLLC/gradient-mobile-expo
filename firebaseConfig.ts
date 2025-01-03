// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore} from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   // apiKey: "AIzaSyDhvdCy3a-OtPh8_hmBFc5dLDd8FI6w8Bo",
//   apiKey: "AIzaSyALdcyf1DH1fVWGvtRjY0rksViKL4ltM0A",
//   authDomain: "gradient-main.firebaseapp.com",
//   projectId: "gradient-main",
//   storageBucket: "gradient-main.appspot.com",
//   messagingSenderId: "675197187246",
//   // appId: "1:675197187246:web:5338bdb9657018adc6293f",
//   appId: "1:675197187246:ios:7704e78ec779b912c6293f",
//   measurementId: "G-JE0JY5LYYS"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const db = getFirestore(app);
// const db = () => {
//   console.log(app);
//   return getFirestore(app);
// }
// const auth = getAuth(app);

// export {app, db, auth};


import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyALdcyf1DH1fVWGvtRjY0rksViKL4ltM0A",
  authDomain: "gradient-main.firebaseapp.com",
  projectId: "gradient-main",
  storageBucket: "gradient-main.appspot.com",
  messagingSenderId: "675197187246",
  appId: "1:675197187246:ios:7704e78ec779b912c6293f",
  measurementId: "G-JE0JY5LYYS"
};

// Check if Firebase app is already initialized
let app : any;
let firestoreDb : any;

try {
  app = getApp(); // Try to get existing app
} catch (error) {
  app = initializeApp(firebaseConfig); // Initialize if not exists
}

// Modify your db function to use cached instance
const db = () => {
  if (!firestoreDb) {
    firestoreDb = getFirestore(app);
  }
  console.log("Here in Config");
  return firestoreDb;
};

const auth = getAuth(app);

export { app, db, auth };