<script setup >
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useMainStore } from '~/store/main.js'
// console.log('inside app.vue')
const mainStore = useMainStore();

// // Check login status when the component is mounted
console.log('app.vue')
onBeforeMount(async () => {
    const auth = getAuth();
    // console.log("auth is: ", auth)
    // console.log(auth.currentUser)
    // if (auth.currentUser) {
    //     const user = auth.currentUser;
    //     mainStore.user = {
    //         uid: user.uid,
    //         displayName: user.displayName,
    //         email: user.email,
    //     };
    //     console.log(mainStore.user)

    // } 
    // firebase is asynchronous so use the onAuthStateChanged
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("user in app is: ", user)
            const { uid, displayName, email } = user;

            let name = user.displayName;
            console.log(uid, email, name)
            mainStore.user = { uid, name, email }
            const accessToken = useCookie('accessToken');
            accessToken.value = user.uid;
            console.log("user inside store is: ", mainStore.user)
        } else {
            console.log("no user")
            mainStore.user = null
            const accessToken = useCookie('accessToken');
            accessToken.value = undefined;
        }
    });
});

// handle logout
const handleLogOut = async () => {
    const auth = getAuth();
    try {
        const accessToken = useCookie('accessToken')
        accessToken.value = undefined;
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
            <NuxtLink
                class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center "
                to="/">Home</NuxtLink>
            <NuxtLink
                class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 text-center"
                to="/login" v-if="!mainStore.user">Login</NuxtLink>
            <NuxtLink @click="handleLogOut"
                class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 text-center"
                to="/" v-else>LogOut</NuxtLink>
        </nav>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
