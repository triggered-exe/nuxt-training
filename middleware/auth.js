import { useMainStore } from '~/store/main.js'
const mainStore = useMainStore();

// const isAuthenticated = () => {
//   const auth = localStorage.getItem("user");
//     // Check if auth is not null or undefined before setting the user
//     if (auth !== null && auth !== undefined) {
//         return true;
//     }
//     return false;
//   }


export default defineNuxtRouteMiddleware(async (to, from) => {
 
  // method 1
  // if (process.server) return
  // const authenticated = localStorage.getItem('user')

  // //  login path
  // if (to.path === '/login') {
  //   console.log('login path');
  //   if (authenticated) {
  //     return navigateTo('/');
  //   }
  //   // User is not authenticated, continue to login page
  //   return;
  // }

  // if (!authenticated) {
  //   alert("login first");
  //   return navigateTo('/');
  // }


  // method 2
 // user wasnt updated before fetching from store, so we are using watch to load the function after it gets updated
  watch(
    () => mainStore.user,
    () => {
      console.log('user changed', mainStore.user)
      console.log(mainStore.user)
      //  login path
      if (to.path === '/login' || to.path === '/signup' ) {
        console.log('login path');
        if (mainStore.user) {
          return navigateTo('/');
        }
        // User is not authenticated, continue to login page
        return;
      }

      if (!mainStore.user) {
        console.log("login first");
        return navigateTo('/');
      }
    }
  )

  if (to.path === '/login' || to.path === '/signup') {
    console.log('login path');
    if (mainStore.user) {
      return navigateTo('/');
    }
    // User is not authenticated, continue to login page
    return;
  }

  if (!mainStore.user) {
    console.log("login first");
    alert('login first')
    return navigateTo('/');
  }
  return;
});
