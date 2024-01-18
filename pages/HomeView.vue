<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template >
  <div class="navBoxContainer">
    <div class="navItems" @click="router.push('/guessNumber')">
      Guess Game
    </div>

    <div class="navItems" @click="$router.push('/submissions')">
      Forms
    </div>

    <div class="navItems" @click="$router.push('/timer')">
      Timer
    </div>
  </div>

</template>

<style scoped>

.navBoxContainer{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  flex-grow: 1;
  top: 0;

}

.navItems {
  height: 3 vmax;
  width: 10vmax;
  border: 1px solid #d014ffa2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  background-color: rgba(6, 215, 252, 0.747);
  border-radius: 10px;
  padding: 10px;
  transition: 0.2s;
  text-align: center;
}

.navItems:hover {
  background-color: rgba(0, 68, 255, 0.884);
  color: white;
}

.navItems:active {
  transform: scale(0.95);
}
</style>
