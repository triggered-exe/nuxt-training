<template>
    <div class="flex flex-col pt-4 justify-center items-center gap-3 w-screen text-white">
        <NuxtLink v-for="data in navData" :class="data.style" :to="data.to" >{{ data.name }}</NuxtLink>
    </div>
</template>

<script setup>

const navData = [
    {
        style:"w-2/3 hover:w-1/3 ease-in duration-300 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/marvel",
        name:"Marvel"
    },
    {
        style:"w-2/3 hover:w-1/3 ease-in duration-300 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/guess-the-number",
        name:"Guess Game"
    },
    {
        style:"w-2/3 hover:w-1/3 ease-in duration-300 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/submitted-form-data",
        name:"Submitted Form Data"
    },
    {
        style:"w-2/3 hover:w-1/3 ease-in duration-300 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/survey-form",
        name:"Survey Form"
    },
    {
        style:"w-2/3 hover:w-1/3 ease-in duration-300 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/student-form",
        name:"Student Form"
    },
    {
        style:"w-2/3 hover:w-1/3 ease-in duration-300 active:scale-95 bg-purple-700 hover:bg-purple-800 font-medium rounded-full text-sm px-5 py-2 my-1 text-center",
        to:"/my-plugins",
        name:"Table"
    },
]

</script>

<style scoped></style>