  
<script setup>


const props = defineProps(['hero', 'handleSelectHero']);
const selectedDetails = ref("comics")
console.log('inside modal', props.hero);
const handleSelectDetails = (data) => {
    console.log(data)
    selectedDetails.value = data;
}
</script>
  

<template>
    <div class=" absolute w-[90vw] h-[90vh] top-1/2 -translate-y-1/2 bg-no-repeat bg-cover p-1 overflow-hidden"
        :style="{ backgroundImage: `url(${hero.thumbnail.path}.${hero.thumbnail.extension})` }">
        <span @click="handleSelectHero"
            class=" z-10 absolute right-2 top-2 bg-red-600 w-[30px] h-[30px] rounded-full flex justify-center items-center text-2xl cursor-pointer">X</span>

        <div class="modalContainer w-full h-full p-2">
            <div class="flex flex-col md:flex-row w-full">
                <div class="max-w-[70%] lg:max-w-[50%] m-auto overflow-hidden">
                    <img class="object-contain max-h-[400px]" :src="`${hero.thumbnail.path}.${hero.thumbnail.extension}`" alt="">
                </div>

                <div class="flex flex-col items-center justify-center p-2 grow text-white">
                    <span class="text-xl font-bold">{{ hero.name }}</span>
                    <div @click="handleSelectDetails('comics')" class="px-1 cursor-pointer">comics: {{ hero.comics.available
                    }}</div>
                    <div @click="handleSelectDetails('series')" class="px-1  cursor-pointer">series: {{
                        hero.series.available }}</div>
                    <div @click="handleSelectDetails('stories')" class="px-1 cursor-pointer">stories: {{
                        hero.stories.available }}</div>
                </div>
            </div>
            <hr class="my-2" />
            <div class="p-2 text-white flex justify-center flex-col items-center grow ">
                <heading class="text-3xl">{{ selectedDetails }} : {{ hero[selectedDetails].available }}</heading>
                <div v-if="hero[selectedDetails].available === 0">
                    No {{ selectedDetails }} available yet
                </div>
                <ul v-else class="overflow-y-scroll max-h-60 bg-red-100 p-2 rounded-md text-slate-700">
                    <li v-for="item in hero[selectedDetails].items" :key="item.id">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modalContainer {
    /* From https://css.glass */
    background: rgba(0, 0, 0, 0.53);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5.9px);
    -webkit-backdrop-filter: blur(5.9px);
    border: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
  