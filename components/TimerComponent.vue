<script setup lang="ts">
import { reactive, onMounted } from 'vue';

const dateData = reactive([]);

const apiData = {
  delhi: "http://worldtimeapi.org/api/timezone/Asia/Kolkata",
  seoul: "http://worldtimeapi.org/api/timezone/Asia/Seoul",
  berlin: "https://worldtimeapi.org/api/timezone/Europe/Berlin",
  newYork: "http://worldtimeapi.org/api/timezone/America/New_York",
};

onMounted(() => {
  // Fetch data initially
  fetchData();

  // Set up interval to fetch data every second
  setInterval(() => {
    fetchData();
  }, 1000);
});

const fetchData = async () => {
  try {
    // Use Promise.all to wait for all fetch calls to complete
    await Promise.all(
      Object.entries(apiData).map(async ([city, apiUrl]) => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const timeString = data.datetime.substring(11, 19);

          // Check if city already exists in dateData
          const existingIndex = dateData.findIndex((entry) => entry.city === city);

          if (existingIndex !== -1) {
            // City exists, update the time
            dateData[existingIndex].timeString = timeString;
          } else {
            // City doesn't exist, add a new entry
            dateData.push({ city, timeString });
          }
        } catch (error) {
          console.error(`Error fetching data for ${city}:`, error);
        }
      })
    );

    // Here you can perform any logic after all fetch calls are completed
    console.log(dateData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
</script>

<template>
  <div class="greetings">
    <!-- Display data for each city in boxes -->
    <div v-for="cityData in dateData" :key="cityData.city" class="city-box">
      <h3>{{ cityData.city }}</h3>
      <p>{{ cityData.timeString }}</p>
    </div>
  </div>
</template>

<style scoped>

.greetings{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100vw;
  height: 100vh;

}
  .city-box {
    border: 1px solid #00000044;
    padding: 10px;
    margin: 10px;
    text-align: center;
    background-color: rgba(14, 70, 255, 0.623);
    cursor: pointer;
  }
  
  .city-box:hover {
    background-color: rgba(62, 107, 255, 0.425);
    
  }
</style>
