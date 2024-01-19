<script setup >
import { useMainStore } from '~/store/main.js'

const mainStore = useMainStore();

const { setUser } = mainStore;

const { $hello } = useNuxtApp();
console.log($hello())

// Check login status when the component is mounted
onBeforeMount( () => {
    const auth = localStorage.getItem("user");
    // Check if auth is not null or undefined before setting the user
    if (auth !== null && auth !== undefined) {
         setUser(auth);
    }
    console.log(mainStore.user)
});

// handle logout
const handleLogOut =  () => {
    localStorage.setItem("user", "");
     setUser(null)
    //  removing the cookie
     const accessToken = useCookie('accessToken')
    accessToken.value = undefined;
     navigateTo('/login')
}
</script>


<template>
    <div class="flex relative min-h-screen flex-col bg-black overflow-hidden">
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
