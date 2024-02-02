
// method 3  using cookies
export default defineNuxtRouteMiddleware(async (to, from) => {
const token = useCookie('accessToken')
// console.log(token.value)
if (to.path === '/login' || to.path === '/signup') {
  console.log('login path');
  if (token.value) {
    return navigateTo('/');
  }
  // User is not authenticated, continue to login page
  return;
}
if (!token.value) {
  console.log("login first");
  alert('login first')
  return navigateTo('/');
}
return;




// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const auth = getAuth();
//  const unsubscribe = onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user

    
//     console.log("user is: ",user)
//     const uid = user.uid;
//     const email = user.email; 
//     const name = user.displayName;
//     mainStore.user = {uid, email}
//     if (to.path === '/login' || to.path === '/signup') {
//       console.log('login path');
//       if (auth) {
//         unsubscribe()
//         return navigateTo('/');
//       }
//     }
//   } else {
//     console.log("no user")
//     mainStore.user = null
//     if (to.path === '/login' || to.path === '/signup') {
//       console.log('login path');
//       unsubscribe()
//         return;
//     }
//     alert('login first')
//     unsubscribe()
//     return navigateTo('/');
//   }export default defineNuxtRouteMiddleware(async (to, from) => {
//   const auth = getAuth();
//  const unsubscribe = onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user

    
//     console.log("user is: ",user)
//     const uid = user.uid;
//     const email = user.email; 
//     const name = user.displayName;
//     mainStore.user = {uid, email}
//     if (to.path === '/login' || to.path === '/signup') {
//       console.log('login path');
//       if (auth) {
//         unsubscribe()
//         return navigateTo('/');
//       }
//     }
//   } else {
//     console.log("no user")
//     mainStore.user = null
//     if (to.path === '/login' || to.path === '/signup') {
//       console.log('login path');
//       unsubscribe()
//         return;
//     }
//     alert('login first')
//     unsubscribe()
//     return navigateTo('/');
//   }
// });
// });




// const isAuthenticated = () => {
//   const auth = localStorage.getItem("user");
//     // Check if auth is not null or undefined before setting the user
//     if (auth !== null && auth !== undefined) {
//         return true;
//     }
//     return false;
//   }


// method 1
// export default defineNuxtRouteMiddleware(async (to, from) => {
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
//  export default defineNuxtRouteMiddleware(async (to, from) => { 
 // watch(
  //   () => mainStore.user,
  //   () => {
  //     console.log('user changed', mainStore.user)
  //     console.log(mainStore.user)

  //     //  login path
  //     if (to.path === '/login' || to.path === '/signup' ) {
  //       console.log('login path');
  //       if (mainStore.user) {
  //         return navigateTo('/');
  //       }
  //       // User is not authenticated, continue to login page
  //       return;
  //     }

  //     if (!mainStore.user) {
  //       console.log("login first");
  //       return navigateTo('/');
  //     }
  //   }
  // )

  // if (to.path === '/login' || to.path === '/signup') {
  //   console.log('login path');
  //   if (mainStore.user) {
  //     return navigateTo('/');
  //   }
  //   // User is not authenticated, continue to login page
  //   return;
  // }

  // if (!mainStore.user) {
  //   console.log("login first");
  //   alert('login first')
  //   return navigateTo('/');
  // }


});