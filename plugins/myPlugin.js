export default defineNuxtPlugin((nuxtApp) => {
    return  {
        provide: {
            hello: () => 'My first plugin'
        }
    }
})  