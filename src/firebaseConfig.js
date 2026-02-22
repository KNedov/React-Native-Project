
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

const firebaseConfig = JSON.parse(process.env.EXPO_PUBLIC_FIREBASE_CONFIG);

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
// export const db = getFirestore(app);
// export const storage = getStorage(app);
