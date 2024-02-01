import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
console.log('inside firebase plugin')
export default defineNuxtPlugin(async (nuxtApp) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const config = useRuntimeConfig();
  
  const firebaseConfig = {
    apiKey: config.public.FB_API_KEY,
    authDomain: config.public.FB_AUTH_DOMAIN,
    projectId: config.public.FB_PROJECT_ID,
    storageBucket: config.public.FB_STORAGE_BUCKET,
    messagingSenderId: config.public.FB_MESSAGING_SENDER_ID,
    appId: config.public.FB_APP_ID,
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  // console.log('auth is: ',auth)
  const database = getFirestore(app);

  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);

  nuxtApp.vueApp.provide('database', database);
  nuxtApp.provide('database', database);
});