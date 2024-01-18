<script setup>

definePageMeta({
  middleware: 'auth'
})

let surveyData = ref([]);
let activeButton = ref('Survey Form');

onMounted(() => {
    getSurveyData(activeButton.value);
})

const getSurveyData = (key) => {
    console.log("survey get");
    const data = JSON.parse(localStorage.getItem(key));
    console.log(data);
    surveyData.value = data;
    activeButton.value = key; // Update activeButton on click
};

const getActiveButtonStyle = (text) => {
    if(text === activeButton.value){
        return ('bg-green-700')
    }
}
</script>

<template>
    <div class="flex-1 flex flex-col text-white">
        <nav class="flex h-8 border-b-2 border-r">
            <NuxtLink to="/survey-form"
                class="flex justify-center items-center flex-1 border-r-2 hover:bg-white hover:text-black">Open Survey Form
                Page</NuxtLink>
            <NuxtLink to="/student-form" class="flex justify-center items-center flex-1 hover:bg-white hover:text-black">
                Open Student Details Form Page</NuxtLink>
        </nav>

        <div class="submissionsContainer flex-1  text-white ">
            <header class="flex justify-center items-center ">
                <!-- used v-bind to toggle the active element-->
                <div :class="getActiveButtonStyle('Survey Form')" 
                    class="w-1/2 p-1.5 text-center border-r-2 bg-purple-700 cursor-pointer"
                    @click="getSurveyData('Survey Form')">
                    surveyForm
                </div>
                <div :class="getActiveButtonStyle('Student Details Form')"
                    class="w-1/2 p-1.5 text-center border-r-2 bg-purple-700  cursor-pointer " @click="getSurveyData('Student Details Form')">
                    studentForm
                </div>
            </header>

            <body v-if="surveyData?.length > 0">
                <table class="data-table ">
                    <thead>
                        <td v-for="property in Object.keys(surveyData[0])" :key="property">{{ property }}</td>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in surveyData" :key="`${data}_${index}`">
                            <td v-for="value in Object.values(data)" :key="`${value}_${index}`">{{ value }}</td>
                        </tr>
                    </tbody>
                </table>
            </body>
        </div>
    </div>
</template>

<style scoped>

.submissionheader div:first-child {
    border-right: 1px solid black;
    transition: 0.3s;
}

.submissionheader .active {
    background-color: #3f3fff5e;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: #8585852e;
}

.data-table th,
.data-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.data-table th {
    background-color: #f2f2f2;
}

.data-table tbody tr:hover {
    background-color: #f5f5f5;
    color: black;
}</style>
