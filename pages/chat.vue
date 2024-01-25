<script setup>
import { ref, onMounted, watch } from 'vue';
import { collection, onSnapshot, addDoc, query, orderBy, limit } from 'firebase/firestore';

const { $database } = useNuxtApp();
const database = $database;

definePageMeta({
    middleware: 'auth'
});



import { useMainStore } from '~/store/main.js';
const mainStore = useMainStore();

const messages = ref([]);
const newMessage = ref([]);
const chatContainer = ref(null);  // Reference to the scrollable container
let messageReceivedAudio = '';
// 
// new Audio("/incoming-noti.mp3").play();  
// const audio = new Audio();  
;

const sendMessage = async () => {
    const sender = mainStore.user.name;
    const timestamp = new Date().toISOString();
    const uid = mainStore.user.uid;

    const messageData = {
        sender,
        text: newMessage.value,
        timestamp,
        uid
    };

    if (!newMessage.value) return;

    // Add the new message to the Firestore collection
    await addDoc(collection(database, 'messages'), messageData);

    // Clear the input field
    newMessage.value = '';
};

// Listen for changes in the 'messages' collection
onMounted(() => {
    messageReceivedAudio = new Audio("/incoming-noti.mp3");
    //     let audio = document.createElement('audio');
    //   audio.src = "/incoming-noti.mp3";
    //   audio.play()

    const messagesCollection = collection(database, 'messages');
    const querySnapshot = query(
        messagesCollection,
        orderBy('timestamp', 'asc'), // Sort by timestamp in descending order
        limit(50) // Retrieve only the last 50 messages
    );

    onSnapshot(querySnapshot, (snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (
            messages.value.length > 0 &&
            updatedMessages.length > messages.value.length &&
            updatedMessages[updatedMessages.length - 1].uid !== mainStore.user.uid
        ) {
            console.log('playing sound');
            messageReceivedAudio.play();
        }
        messages.value = updatedMessages;

        console.log("messages are: ", messages.value)
        scrollToBottom();
    });
});

watch(() => mainStore.user, (newValue, oldValue) => {
    console.log('User changed:', newValue);
});

watch(() => messages, () => {
    // Scroll to the bottom
    scrollToBottom();
});

const scrollToBottom = () => {
    // Wait for the next tick to ensure the DOM has been updated
    // and then scroll to the bottom
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
    });
};
</script>

<template>
    <div class="relative flex flex-col text-white max-w-[800px] w-[70vw] bg-purple-950 m-auto max-h-[500px] min-h-[500px]">
        <h1 class="text-white-800 font-bold text-3xl text-center">Global Chat</h1>
        <hr />
        <div class="h-full flex-1 overflow-y-scroll py-2" ref="chatContainer">
            <div class="p-3 my-1" v-for="message in messages" :key="message.id"
                :class="{ 'text-right': message.uid === mainStore.user.uid, 'text-left': message.uid !== mainStore.user.uid }">
                <span>{{ message.text }}</span>
                <span class="text-xs text-gray-500 block">{{ message.sender }}</span>
            </div>
        </div>
        <!-- Fixed input and button outside the scrollable area -->
        <div class="flex w-full bottom-0">
            <input class="grow text-black p-2 outline-none rounded-l-lg max-w-[70%] md:max-w-[80%]" v-model="newMessage"
                @keyup.enter="sendMessage" placeholder="Type your message..." />
            <button class="p-2 grow bg-blue-700 rounded-r-lg max-w-[30%] md:max-w-[20%]"
                @click="sendMessage">Submit</button>
        </div>
    </div>
</template> 
