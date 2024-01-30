<script setup>
    

const { $table } = useNuxtApp();

const number = ref(0);
const tableData = ref('')
const handleSubmit = () => {

    if (number.value <= 0 || number.value > 1000) {
        alert('enter a value between 1 and 1000')
        return;
    }
    tableData.value = $table(number.value)
}
</script>



<template>
    <div class="text-white m-auto border-2">
        <div>
            <input class="text-black p-1.5" type="number" v-model="number" required />
            <button class="bg-purple-700 p-1.5" @click="handleSubmit">get table</button>
        </div>

        <ul class="px-3">
            <li v-for="data in tableData">{{ data }}</li>
        </ul>
    </div>
</template>


<style scoped></style>      