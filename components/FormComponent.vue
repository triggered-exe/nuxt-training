<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps(['formData']);

console.log(props.formData);
const formData = props.formData;

// Create dynamic refs for input values
const inputValues = {};
formData.input.forEach(input => {
    inputValues[input.name] = ref("");
});

console.log(inputValues)

const handleSubmit = () => {
    const submittedData = {};
    formData.input.forEach(input => {
        submittedData[input.name] = inputValues[input.name].value;
    });

    // Save submitted data to Local Storage
    const storedData = JSON.parse(localStorage.getItem(formData.name)) || [];
    console.log(storedData)
    storedData.push(submittedData);
    localStorage.setItem(formData.name, JSON.stringify(storedData));
    alert("form submitted")
    console.log(submittedData);
};
</script>



<template>
    <div class="formContainer">
        <h1 class="text-white">{{ formData.name }}</h1>

        <form @submit.prevent="handleSubmit">
            <div v-for="input in formData.input"> 
                <!--    <label>{{ input.name }}:</label> -->
                <input :type="input.type" v-model="inputValues[input.name].value" :placeholder="`Enter ${input.name}`"
                    required />
            </div>
            <div>
                <input type="submit" value="submit" />
            </div>
        </form>
    </div>
</template>



<style scoped>
.formContainer {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding-top: 20px;
}

.formContainer form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 28vmax;
    border: 1px solid rgba(0, 0, 0, 0.322);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.39);
}

.formContainer form input {
    margin-left: 10px;
    padding: 5px;

}

.formContainer form input[type="submit"] {
    width: 4rem;
    background-color: rgba(44, 44, 255, 0.877);
    color: white;
    border: none;
    transition: 0.3s;
    border-radius: 5px;
}

.formContainer form input[type="submit"]:hover {
    background-color: rgba(44, 135, 255, 0.877);
}

.formContainer form input[type="submit"]:focus {
    transform: scale(0.95);
}
</style>
