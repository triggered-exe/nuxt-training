<script setup >
import { useMainStore } from '~/store/index.js'

const mainStore = useMainStore();

const { setUser } = mainStore;

const router = useRouter();

// Check login status when the component is mounted
onMounted(() => {
    const auth = localStorage.getItem("user");
    // Check if auth is not null or undefined before setting the user
    if (auth !== null && auth !== undefined) {
        setUser(auth);
    }
});

// handle logout
const handleLogOut = () => {
    localStorage.setItem("user", "");
    setUser(null)
}
</script>


<template>
    <div class="flex relative min-h-screen flex-col bg-black overflow-hidden">
        <nav class="flex justify-between items-center px-3 border-b-2 border-slate-300 ">
            <NuxtLink class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center " to="/">Home</NuxtLink>
            <NuxtLink class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 text-center" to="/" v-if="!mainStore.user">Login</NuxtLink>
            <NuxtLink class="active:scale-95 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 text-center" to="/" v-else>LogOut</NuxtLink>
        </nav>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
