<script setup>
import Form from '../components/FormComponent.vue'
import formData from '../data/studentForm.json'
definePageMeta({
  middleware: 'auth'
})

console.log(formData)
</script>

<template>
  <Form :formData="formData" />
</template>

<style>
</style>