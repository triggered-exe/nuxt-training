<script setup>
import { ref } from 'vue'
const hint = ref("start guessing")
const guess = ref(0)
let number = Math.floor(Math.random() * 100) + 1;
console.log(number)

definePageMeta({
  middleware: 'auth'
})

const checkNumber = () => {
    const userGuess = parseInt(guess.value);

    if (!isNaN(userGuess)) {
        if (userGuess === number) {
            hint.value = "Congratulations! You guessed the correct number!";
            number = Math.floor(Math.random() * 100) + 1;
        } else if (userGuess < number) {
            hint.value = "Too low! Try a higher number.";
        } else {
            hint.value = "Too high! Try a lower number.";
        }
    } else {
        hint.value = "Please enter a valid number.";
    }
}
</script>

<template>
    <div class="gameContainer">
        <div class="heading">
                    <h1>Guess the Number</h1>
        </div>

        <div>
            <form @submit.prevent="checkNumber">
             <input type="number" v-model="guess" required />
            <button >Check Number</button>
            </form>

        </div>
        <div class="hint">
            <h1>{{ hint }}</h1>
        </div>
    </div>
</template>

<style scoped>

.gameContainer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.gameContainer .heading {
    height: 30vh;
    background-color: rgba(229, 127, 255, 0.712);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

form {
    width: 100vw;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    background-color: rgba(79, 160, 231, 0.452);
    
}

form input {
    padding: 10px;
    outline: none;
}

form button {
    padding: 10px;
    font-size: 1.5rem;
    background-color: aquamarine;
}

.hint { 
    width: 100vw;
    height:30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(138, 222, 135);
    padding: auto;
}

</style>