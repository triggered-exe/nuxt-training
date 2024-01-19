export default defineEventHandler((event) => {
    return {
        message: 'Hello World',
        date: new Date().toISOString(),
        randomNumber: Math.random(),
    }
})