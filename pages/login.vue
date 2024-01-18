<script setup>
import { defineProps, defineEmits } from 'vue';
import { useMainStore } from '~/store/main'
import {useRouter } from 'vue-router'
import formData from '../data/LoginFormData.json'
import Form from '../components/AuthForm.vue'

const props = defineProps(['formData','user']);

const mainStore = useMainStore();

const router = useRouter(); 

definePageMeta({
  middleware: 'auth'
})

// if user is logged in then redirect to the home
// console.log('inside loginview')
// console.log(mainStore.user)
// if(mainStore.user){
//     console.log('redirecing to home')
//     router.push('/')
// }   

// Watch for changes in the user property
// watch(() => mainStore.user, (newValue) => {
//   // Redirect to home if user is logged in
//   console.log('redirecing to home') 
//   if (newValue) {
//     router.push('/');
//   }
// });

</script>


<template>
    <!-- passing a secondary event to received the user set by login page -->
     <Form :formData="formData" />
     <div class="text-white" @click="$router.push('/signup')" >Not a user? try Sign Up</div>
</template>



<style scoped>
div {
    width: 100%;
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
}
</style>     