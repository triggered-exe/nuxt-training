<script setup>
const props = defineProps(['users', 'handleSearchModalClick']);
</script>

<template>
    <div class="w-full  bg-slate-400">
        <ul class="m-1 text-white overflow-y-scroll h-full">
            <li class="flex gap-2 itemsendMessages-center cursor-pointer borderchatUsers-b-[1px] p-2"
                @click="handleSearchModalClick(user)" v-for="user in users" :key="user">
                <img class="w-[20px] h-[20px] rounded-full" :src="`/profile-logo.jpg`" alt="Profile Image" />
                <span>{{ user?.displayName }}</span>
            </li>
        </ul>
    </div>
</template>

