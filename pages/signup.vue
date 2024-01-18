<script setup>
import { defineProps, defineEmits } from 'vue';
import {useRouter } from 'vue-router'
import formData from '../data/SignupFormData.json'
import Form from '../components/AuthForm.vue'

const router = useRouter();

const props = defineProps(['user']);


console.log('user: '+ props.user)
console.log('inside signup view')
console.log(props.user)
if(props.user){
    console.log('redirecing to home')
    router.push('/')
}

</script>
<template>
     <Form :formData="formData" :user="props.user"/>

     <div @click="$router.push('/login')">Already a user? try login</div>
</template>
<style scoped>
div {
    width: 100%;
    text-align: center;
    cursor: pointer;
    margin-bottom: 10px;
}
</style>     