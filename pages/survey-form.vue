<script setup>
import Form from '../components/FormComponent.vue'
import formData from '../data/surveyForm.json'

definePageMeta({
  middleware: 'auth'
})


console.log(formData);
</script>

<template>
  <Form :formData="formData" />
</template>

<style>
</style>
    