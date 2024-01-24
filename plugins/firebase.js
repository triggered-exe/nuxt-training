import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const config = useRuntimeConfig();

  
  const firebaseConfig = {
    apiKey: "AIzaSyCF_7Av-InygtisElUjuo_92v7IrLpbOfU",
    authDomain: "vue-chat-fa17e.firebaseapp.com",
    projectId: "vue-chat-fa17e",
    storageBucket: "vue-chat-fa17e.appspot.com",
    messagingSenderId: "293445729550",
    appId: "1:293445729550:web:bf14b30e25ce149d6aab5f"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('firestore', firestore);
  nuxtApp.provide('firestore', firestore);
});