<script setup>
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store/main'
import { defineProps, defineEmits, ref } from 'vue';
// import database from '~/firebase';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

const { $database, $auth } = useNuxtApp();

const database = $database;

const router = useRouter();

// getting the main store data
const mainStore = useMainStore();

const props = defineProps(['formData']);
// console.log(props.formData);
const formData = props.formData;

// Create dynamic refs for input values
const inputValues = {};
formData.input.forEach(input => {
    inputValues[input.name] = ref("");
});


const handleSubmit = async () => {

    const auth = getAuth();

    if (formData.type === 'signup') {
        const submittedData = {};
        formData.input.forEach(input => {
            submittedData[input.name] = inputValues[input.name].value;
        });

        const emailInput = inputValues["Email"].value;
        const password = inputValues["Password"].value;
        const displayName = inputValues['name'].value;
        console.log('handlign signup')
        try {
            // Step 1: Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, emailInput, password);
            const user = userCredential.user;
            console.log("user is: ", user);

            await updateProfile(user, {
                displayName: displayName,
            });

            console.log(user)
            const { uid, displayName: userDisplayName, email } = user;  

            // Step 2: Update Firestore document with user data
            const usersCollectionRef = collection(database, 'users');
            const userDocRef = doc(usersCollectionRef, user.uid);

            await setDoc(userDocRef, {
                displayName: displayName,
                email: email,
            });

            const name = userDisplayName;
            // setting mainstore here because app.vue is getting called before the execution of this function and it doesnt get the displayName
            mainStore.user = { uid, name, email };
            console.log('updated user: ', user);
            navigateTo('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
            alert(errorMessage);
        }

        console.log('end')

    } else {
        console.log('EMAIL: ' + inputValues['Email'].value + '   pass: ' + inputValues['Password'].value)
        // const storedData = JSON.parse(localStorage.getItem("userData")) || [];
        // console.log(storedData)

        const email = inputValues['Email'].value.trim();
        const password = inputValues['Password'].value.trim();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const { uid, displayName: userDisplayName, email } = user;

                const name = userDisplayName;
                // setting mainstore here because app.vue is getting called before the execution of this function and it doesnt get the displayName
                mainStore.user = { uid, name, email };
                const accessToken = useCookie('accessToken');
                accessToken.value = user.uid;

                navigateTo('/');
                alert('Logged in successfully');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
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
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.formContainer form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    width: 25vmax;
    border: 2px solid rgba(255, 255, 255, 0.274);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.39);
}

.formContainer form input {
    margin-left: 10px;
    width: 90%;
    padding: 5px;
    color: black;
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
