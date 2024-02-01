<script setup>
const props = defineProps(['users', 'handleSearchModalClick']);
</script>

<template>
    <div class="w-full searchContainer">
        <ul class="m-1 text-white overflow-y-scroll h-full">
            <li class="flex gap-2 itemsendMessages-center cursor-pointer borderchatUsers-b-[1px] p-2"
                @click="handleSearchModalClick(user)" v-for="user in users" :key="user">
                <img class="w-[20px] h-[20px] rounded-full" :src="`/profile-logo.jpg`" alt="Profile Image" />
                <span>{{ user?.displayName }}</span>
            </li>
        </ul>

        <h2 class="pl-2 text-red-800" v-if="users.length === 0">Uhhh... No users Found</h2>
    </div>
</template>

<style scoped>
.searchContainer {
    background: #6d6fff;
background: -webkit-linear-gradient(121deg, #6d6fff 0%, #a200ff 100%);
background: linear-gradient(121deg, #6d6fff 0%, #a200ff 100%);
}
</style>