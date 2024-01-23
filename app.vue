<script setup >
import database  from './firebase';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useMainStore } from '~/store/main.js'
// console.log('inside app.vue')
const mainStore = useMainStore();

const { setUser } = mainStore;

definePageMeta({
  middleware: 'auth'
})


// // Check login status when the component is mounted
onBeforeMount( async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    
    console.log(user)
    const uid = user.uid;
    const email = user.email;
    const name = user.providerData[0]?.displayName;
    mainStore.user = {uid, name, email}
    console.log(mainStore.user)

  } else {
    console.log("no user")
    mainStore.user = null
  }
});

});

// handle logout
const handleLogOut =  async() => {
    const auth = getAuth();
    try {
      await signOut(auth);
      mainStore.user = null;
      return navigateTo('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
}
</script>


<template>
    <div class="flex relative min-h-screen h-screen flex-col bg-black overflow-hidden">
        <nav class="flex justify-between items-center px-3 border-b-2 border-slate-300 ">
            <NuxtLink class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center " to="/">Home</NuxtLink>
            <NuxtLink class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 text-center" to="/login" v-if="!mainStore.user">Login</NuxtLink>
            <NuxtLink @click="handleLogOut" class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 text-center" to="/" v-else>LogOut</NuxtLink>
        </nav>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
