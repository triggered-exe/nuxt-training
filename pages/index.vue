<template>
    <div class="flex flex-col h-full pt-4 justify-center items-center gap-3 w-screen text-white">
        <NuxtLink v-for="data in navData" :class="data.style" :to="data.to" >{{ data.name }}</NuxtLink>
    </div>
</template>

<script setup>

const navData = [
    {
        style:"navItem max-w-[400px] w-2/3 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/marvel",
        name:"Marvel"
    },
    {
        style:"navItem max-w-[400px] w-2/3 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/chat",
        name:"Chat App"
    },
    {
        style:"navItem max-w-[400px] w-2/3 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/guess-the-number",
        name:"Guess Game"
    },
    {
        style:"navItem max-w-[400px] w-2/3 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/submitted-form-data",
        name:"Submitted Form Data"
    },
    {
        style:"navItem max-w-[400px] w-2/3 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/survey-form",
        name:"Survey Form"
    },
    {
        style:"navItem max-w-[400px] w-2/3 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/student-form",
        name:"Student Form"
    },
    {
        style:"navItem max-w-[400px] w-2/3 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/my-plugins",
        name:"Table"
    },

]

</script>

<style scoped>
.navItem:hover {
    animation: wiggle 0.4s ease-in infinite;
}

@keyframes wiggle {
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(2%);
    }
    72% {
        transform: translateX(-2%);
    }
    100% {
        transform: translateX(0);
    }
}

</style>