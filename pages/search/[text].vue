<script setup>
definePageMeta({
  layout: 'marvel',
  middleware: 'auth'
})
import { onMounted } from 'vue';

const loading = ref(false)
const hero_data = ref([])
const fav_data = ref([])

const route = useRoute();
const textSearched = route.params.text;
const PUBLIC_KEY = "17276195778173eaec5692353710b8aa";
// const PRIVATE_KEY = "41364c67101cfb1e1f3cb5f109b5e4a41c22d73f";
const TIMESTAMP = 1;
const HASH = "2dee9fdb14009b460952ba66887aa4f2";

const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}&apikey=${PUBLIC_KEY}&hash=${HASH}?ts=${TIMESTAMP}`


onMounted(async () => {
    loading.value = true;
    fav_data.value = JSON.parse(localStorage.getItem('favouriteHeros')) || [];
    console.log(fav_data.value)
    let response = await fetch(url);
    let data = await response.json();
    hero_data.value = data.data.results;
    loading.value = false;
    console.log(data.data.results)
})

// function to handle add to fav
const handleAddandRemoveToFav = (hero) => {
    const index = fav_data.value.findIndex((data) => {
        return data.name === hero.name;
    });

    console.log(index)

    // if hero is already favorited
    if (index >= 0) {
        fav_data.value.splice(index, 1);
    } else {
        fav_data.value.push(hero);
        console.log(fav_data.value);
        localStorage.setItem("favouriteHeros", JSON.stringify(fav_data.value));
    }
};


const isHeroFav = (hero) => {
    return fav_data.value.some((data) => data.name === hero.name);
};
const getFavButtonText = (hero) => {
    return isHeroFav(hero) ? 'Remove from Fav' : 'Add to Fav';
};

const getFavButtonStyle = (hero) => {
    return isHeroFav(hero) ? 'bg-green-500/80 hover:bg-green-600' : 'bg-yellow-500/80 hover:bg-yellow-600';
};


</script>


<template>
    <div class="w-full h-full relative flex flex-1 justify-center overflow-y-scroll overflow-x-hidden bg-slate-500 bg-fixed bg-poster bg-center bg-no-repeat bg-cover">
        <!-- loading animation -->
        <div v-if="loading" class="flex h-full justify-center items-center">
            <img src="~/assets/loader.gif" alt="Loading..." />
        </div>


        <div v-else-if="hero_data.length == 0" class="flex flex-col h-full justify-center items-center text-white">
            <!-- <img src="~/assets/nothing.gif" alt="Loading..." /> -->
            <iframe src="https://giphy.com/embed/8yvdQMhayX1zbMou11" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            <p>Nothing found....</p>
        </div>

        <div v-else
            class="max-w-[900px] flex  flex-wrap justify-around overflow-scroll overflow-x-hidden backdrop-blur-md">
            <div class="group font-serif relative m-5 border-2 border-rose-600  rounded-md  overflow-hidden w-40  shadow-lg bg-purple-500	"
                v-for="hero in hero_data">
                <div class="w-full">
                    <img class="w-full h-40 object-cover" :src="hero.thumbnail.path + '.' + hero.thumbnail.extension" />
                </div>
                <div class="px-1 font-bold">{{ hero.name }}</div>
                <div class="px-1 ">comics: {{ hero.comics.available }}</div>
                <div class="px-1">series: {{ hero.series.available }}</div>
                <div class="px-1">stories: {{ hero.stories.available }}</div>
                <div
                    class="absolute top-0 h-full w-full flex flex-col justify-center items-center gap-2 opacity-0 group-hover:opacity-100">
                    <button 
                        class="h-15 w-36 p-2 bg-yellow-500/80 rounded-md hover:bg-yellow-600">Open</button>
                    <button @click="handleAddandRemoveToFav(hero)" class="h-15 w-36 p-2 rounded-md text-white"
                        :class="getFavButtonStyle(hero)">
                        {{ getFavButtonText(hero) }}
                    </button>
                </div>

            </div>
        </div>

</div></template> 


<style scoped>
.shadow-lg {
    box-shadow: 0 0 13px -1px red
}

.bg-poster{
    background-image: url("~/assets/54674.jpg");
}
</style>