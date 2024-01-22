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
      <form @submit.prevent="handleSubmit">
        <input class="w-15 p-1 outline-amber-400 text-black" type="text" placeholder="search your hero" v-model="searchText"/>
        <button class="w-15 p-1 bg-red-800 active:scale-95">search</button>
      </form>
    </div>
  </div>
</template>


<style scoped>
.bg-poster{
    background-image: url("~/assets/54688.jpg");
}
</style>