export default defineNuxtPlugin((nuxtApp) => {

    const table = (n) => {
        let result = [];
        for(let i=1; i<=10; i++){
            result.push(n +' * ' + i + ' = ' + n*i)
        }

        return result;
    }
            nuxtApp.provide("table", table);
            // nuxtApp.vueApp.provide("table", table);
})              