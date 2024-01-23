      
<script setup>
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, query, orderBy, limit } from 'firebase/firestore';
import database  from '~/firebase';

definePageMeta({
  middleware: 'auth'
})

import { useMainStore } from '~/store/main.js'
const mainStore = useMainStore();


const messages = ref([]);
const newMessage = ref('');

const sendMessage = async () => {
    const sender = mainStore.user.name;
    const timestamp = new Date().toISOString();
    console.log(mainStore.user)
    console.log(sender)
    const messageData = {
        sender,
        text: newMessage.value,
        timestamp,
    };

    // Add the new message to the Firestore collection
    await addDoc(collection(database, 'messages'), messageData);

    // Clear the input field
    newMessage.value = '';
};

// Listen for changes in the 'messages' collection
onMounted(() => {
    
    const messagesCollection = collection(database, 'messages');
    const querySnapshot = query(
        messagesCollection,
        orderBy('timestamp', 'asc'), // Sort by timestamp in descending order
        limit(50) // Retrieve only the last 50 messages
    );

    onSnapshot(querySnapshot, (snapshot) => {
        messages.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(messages.value);
    });
});

watch(() => mainStore.user, (newValue, oldValue) => {
  console.log('User changed:', newValue);
});

</script>

      
<template>
    

    <div class="relative flex flex-col text-white max-w-[800px] w-[70vw] bg-purple-950 m-auto max-h-[500px] min-h-[500px]">
        <h1 class="text-white-800 font-bold text-3xl text-center">chit chat</h1>
        <hr />
        <div class="h-full flex-1 overflow-y-scroll">
            <div class="p-3" v-for="message in messages" :key="message.id">
                {{ message.sender }}: {{ message.text }}
            </div>
        </div>
        <!-- Fixed input and button outside the scrollable area -->
        <div class="flex  w-full bottom-0">
            <input class="text-black grow p-1 outline-none" v-model="newMessage" @keyup.enter="sendMessage" />
            <button class="p-1 bg-blue-700" @click="sendMessage">Submit</button>
        </div>
    </div>
</template>
