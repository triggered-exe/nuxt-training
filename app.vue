    <script setup >
    console.log
    import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
    import { useMainStore } from '~/store/main.js'
    const mainStore = useMainStore();
    const { $auth} = useNuxtApp();

    // // Check login status when the component is mounted
    onBeforeMount(async () => {
        if(process.server) return;
        const auth = $auth;
        mainStore.user = auth.currentUser;
        // console.log('mainstore user is : ', mainStore.user)
        // console.log("logged user: ",auth.currentUser)
        // firebase is asynchronous so use the onAuthStateChanged
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, displayName, email } = user;

                let name = displayName;
                // console.log(uid, email, name)    
                mainStore.user = { uid, name, email }
                const accessToken = useCookie('accessToken');
                accessToken.value = user.uid;
                // console.log("user inside store is: ", mainStore.user)
            } else {
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
        <div class="flex relative min-h-screen h-screen flex-col bg-black overflow-hidden select-none">
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
