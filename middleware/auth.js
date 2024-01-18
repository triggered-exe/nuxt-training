

// const isAuthenticated = () => {
//   const auth = localStorage.getItem("user");
//     // Check if auth is not null or undefined before setting the user
//     if (auth !== null && auth !== undefined) {
//         return true;
//     }
//     return false;
//   }


import { useMainStore } from '~/store/main.js'

const mainStore = (useMainStore());

export default defineNuxtRouteMiddleware(async (to, from) => {
  // if (process.server) return
  console.log('middleware start');

  // user wasnt updated before fetching from store, so we are using watch to load the function after it gets updated
  watch(
    () => mainStore.user,
    () => {
      console.log('user changed', mainStore.user)
      console.log(mainStore.user)
      //  login path
      if (to.path === '/login') {
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

  //  login path
  if (to.path === '/login') {
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
