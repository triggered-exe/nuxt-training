<script setup>
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store/main'
import { defineProps, defineEmits, ref } from 'vue';
const router = useRouter();

// getting the main store data
const mainStore = useMainStore();
const { user, setUser } = mainStore;

const props = defineProps(['formData']);
console.log(props.formData);
const formData = props.formData;
const emits = defineEmits(['setLoginEvent']);

// Create dynamic refs for input values
const inputValues = {};
formData.input.forEach(input => {
    inputValues[input.name] = ref("");
});


const handleSubmit = () => {

    if (formData.type === 'signup') {
        const submittedData = {};
        formData.input.forEach(input => {
            submittedData[input.name] = inputValues[input.name].value;
        });

        // Save submitted data to Local Storage
        const storedData = JSON.parse(localStorage.getItem("userData")) || [];
        console.log(storedData)
        storedData.push(submittedData);
        localStorage.setItem("userData", JSON.stringify(storedData));
        alert("signed up successfully")
        console.log(submittedData);
        router.push('/login')
    }else {
        console.log('EMAIL: '+ inputValues['Email'].value +'   pass: '+ inputValues['Password'].value)
        const storedData = JSON.parse(localStorage.getItem("userData")) || [];
        console.log(storedData)

        const email = inputValues['Email'].value.trim();
        const password = inputValues['Password'].value.trim();

        const matchingUser = storedData.find(user => user.Email === email);

        if (matchingUser && matchingUser.Password === password) {
            localStorage.setItem("user", matchingUser.name)
            alert('Login successful');
            setUser(matchingUser.name);
            router.push('/')
        } else {
            alert('Invalid email or password');
        }   
    }
};

</script>



<template>
    <div class="formContainer text-white">
        <h1>{{ formData.name }}</h1>

        <form @submit.prevent="handleSubmit">
            <div v-for="input in formData.input">
                <input :type="input.type" v-model="inputValues[input.name].value" :placeholder="`Enter ${input.name}`"
                    required />
            </div>
            <div>
                <input type="submit" value="submit" />
            </div>
        </form>
    </div>
</template>



<style>
.formContainer {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

}

.formContainer form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    width: 25vmax;
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
