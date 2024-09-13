import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase , query, ref as rtRef} from "firebase/database";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FirebaseApiKey,
  authDomain: process.env.NEXT_PUBLIC_FirebaseAuthDomain,
  databaseURL: process.env.NEXT_PUBLIC_FirebaseDatabaseURL,
  projectId: process.env.NEXT_PUBLIC_FirebaseProjectId,
  storageBucket: process.env.NEXT_PUBLIC_FirebaseStorageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FirebaseMessagingSenderId,
  appId: process.env.NEXT_PUBLIC_FirebaseAppId,
  measurementId: process.env.NEXT_PUBLIC_MeasurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const realtimeDb = getDatabase(app);
const googleProvider = new GoogleAuthProvider();
const queryUserDB = query(rtRef(realtimeDb, `/users/`));



export { app, auth, realtimeDb, googleProvider, rtRef, queryUserDB };
