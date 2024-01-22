<script setup>

definePageMeta({
  layout: 'marvel',
  middleware: 'auth'
})

useSeoMeta({
  title: 'Marvel Hunt',
})

const searchText = ref('')
const handleSubmit = () => {
  if (!searchText.value || !isNaN(searchText.value)) {
    alert('Enter a valid input')
    return null;
  }
  navigateTo(`/search/${searchText.value}`)
};
</script>

<template>
  <div class="w-screen flex-1 flex justify-center items-center  bg-fixed bg-poster bg-center bg-no-repeat bg-cover" >
    <div  class="text-white">
      <form class="border-2 border-purple-600 rounded-lg hover:border-yellow-600" @submit.prevent="handleSubmit">
        <input class="w-15 p-2  text-black outline-none rounded-l-lg	" type="text" placeholder="search your hero" v-model="searchText"/>
        <button class="w-15 p-2 bg-red-800 active:scale-95 rounded-r-lg	">search</button>
      </form>
    </div>
  </div>
</template>


<style scoped>
.bg-poster{
    background-image: url("~/assets/54688.jpg");
}
</style>