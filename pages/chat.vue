<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { collection, doc, onSnapshot, addDoc, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useMainStore } from '~/store/main.js';

const { $database } = useNuxtApp();
// console.log($auth)

const database = $database;

definePageMeta({
    middleware: 'auth'
});

const mainStore = useMainStore();
const messages = ref(null);
const newMessage = ref([]);
const chatContainer = ref(null);
const selectedUser = ref(null);
const showSearchResultModal = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const currentlyOpenedChat = ref(null)
const users = ref([]);
const chatUsers = ref([]); // To store users with whom the current user has chatted
let messageReceivedAudio = '';

// function to send the message
const sendMessage = async () => {
    try {
        // Destructure properties from mainStore.user
        const { name, uid } = mainStore.user;
        // Check if newMessage and selectedUser are present
        if (!newMessage.value || !selectedUser.value) {
            console.log(newMessage.value, selectedUser.value)
            return;
        }

        const timestamp = new Date().toISOString();

        const messageData = {
            sender: name,
            text: newMessage.value,
            timestamp,
            uid,
        };

        // Add the new message to the Firestore collection within the specific chat document
        const chatId = currentlyOpenedChat.value; // Assuming currentlyOpenedChat is a ref to the chat document
        const messagesCollection = collection(database, `chats/${chatId}/messages`);
        await addDoc(messagesCollection, messageData);
        console.log("inside send message selectedUser.value: ",selectedUser.value)  
        // Clear the input field
        newMessage.value = '';
    } catch (error) {
        console.error('Error sending message:', error);searchQuery
    }
};



// load the users at th initial load for search functionality
const fetchAllUsers = async () => {
    const usersCollection = collection(database, 'users');
    const usersQuery = query(usersCollection, limit(1000));
    try {
        const userSnapshot = await getDocs(usersQuery);
        userSnapshot.docs.map((doc) => {
            // console.log(doc.data())
            if (doc.id !== mainStore.user.uid) {
                //    return { id: doc.id, ...doc.data() }; 
                users.value.push({ id: doc.id, ...doc.data() })

            }
        })
        // console.log('all users are: ', users.value)
    } catch (error) {
        auth
        console.log('error fetching users: ', error)
    }searchQuery
}

// fetch the users with whom the logged user has already chat
const fetchChatUsers = async () => {
    const chatsCollection = collection(database, 'chats');
    const chatsQuery = query(chatsCollection);

    try {
        const chatsSnapshot = await getDocs(chatsQuery);

        chatsSnapshot.docs.forEach(doc => {
            const user1 = doc.data().users[0];
            const user2 = doc.data().users[1];
            if (user1 === mainStore.user.uid) {
                // console.log('checking user1')
                const userDetails2 = users.value.find(user => user.id === user2);
                chatUsers.value.push(userDetails2);
                // console.log(userDetails2.displayName)
            } else if (user2 === mainStore.user.uid) {
                // console.log('checking user2')
                const userDetails1 = users.value.find(user => user.id === user1);
                chatUsers.value.push(userDetails1);
                // console.log(user1)
            }
        });

        // console.log(chatUsers.value)
        if (chatUsers.value.length < 5) {
            let i = 0;
            while (chatUsers.value.length < 5 && i < users.value.length) {
                // console.log('inside loop')
                if (!chatUsers.value.includes(users.value[i]) && users.value[i].id !== mainStore.user.uid) {
                    // console.log(mainStore.user.uid, '     ', users.value[i].id)
                    chatUsers.value.push(users.value[i]);
                }
                i++;
            }
        }
        // console.log('Users with whom mainStore.user has chatted:', chatUsers.value);
    } catch (error) {searchQuery    
        console.error('Error fetching chat users:', error);
    }
};


// functon to open the chat in the chat container
const handleOpenChat = async (user) => {
    const currentUserUid = mainStore.user.uid;
    const otherUserId = user.id;
    const chatsCollection = collection(database, 'chats');
    selectedUser.value = user;

    const chatQuery = query(
        chatsCollection,
        where('usersId', 'in', [currentUserUid + otherUserId, otherUserId + currentUserUid])
    );
    try {
        const chatSnapshot = await getDocs(chatQuery);

        if(!chatSnapshot.empty) {
                const chatDoc = chatSnapshot.docs[0];
            console.log('Chat found:', chatDoc.data());

            // Assign the currently opened chat
            currentlyOpenedChat.value = chatDoc.id;
            // console.log(chatDoc.ref)
            // console.log('currentlyOpenedChat.value : ', currentlyOpenedChat.value)
            // Start listening to messages in this chat
            startListeningToMessages(chatDoc.id);
        } else {
            console.log('No chat found between the users.');
            const newChatDoc = await addDoc(chatsCollection, {
                usersId: currentUserUid + otherUserId,
                users: [currentUserUid, otherUserId],
                messages: []
            });

            console.log('New chat created:', newChatDoc.id);

            // Assign the currently opened chat
            currentlyOpenedChat.value = newChatDoc.id;
            // console.log('currentlyOpenedChat.value : ', currentlyOpenedChat.value)
            // console.log('selectedUser', newChatDoc.id)
            // Start listening to messages in this chat
            startListeningToMessages(newChatDoc.id);
        }

    } catch (error) {
        console.error('Error finding chat:', error);
    }
};


// Function to start listening to messages in the currently opened chat
const startListeningToMessages = (id) => {
    try {
        // console.log(id)
        const messagesCollection = collection(database, `chats/${id}/messages`);
        const querySnapshot = query(
            messagesCollection,
            orderBy('timestamp', 'asc')
        );

        onSnapshot(querySnapshot, (snapshot) => {
            const updatedMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            messages.value = updatedMessages;

            // Check if the message received is from another user
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            if (lastMessage && lastMessage.uid !== mainStore.user.uid) {
                // console.log('playing audio'){
                messageReceivedAudio.play();
            }
            // console.log(updatedMessages)
        });
    } catch (error) {
        console.log(error)
    }
};


// function to search the users array based on the search query
const searchUsersByName = async (searchQuery) => {
    try {
        // Assuming you have a ref named 'users' that contains all user details
        const filteredUsers = users.value.filter(user => {
            // Replace 'name' with the actual field name containing the user's name
            const userName = user.displayName || '';
            return userName.toLowerCase().includes(searchQuery.toLowerCase());
        });

        // console.log('Users matching the search query:', filteredUsers);
        // Return the filtered users or use them as needed in your application
        return filteredUsers;
    } catch (error) {
        console.error('Error searching users:', error);
    }
};


// handle search modal
const handleSearchModalClick = (user) => {
    // add to the chatUser if not already addedsearchQuery
    const isPresent = chatUsers.value.filter(data => {
        return data.id === user.id
    })
    if (!isPresent) {
        chatUsers.value.unshift(user)
    }
    // add to selected user
    // selectedUser.value = user;
    console.log("selected user is",selectedUser.value)
    handleOpenChat(user)
    toggleSearchResultModal()
}

// function to toggle the  modal
const toggleSearchResultModal = () => {
    showSearchResultModal.value = !showSearchResultModal.value;
};


// watcher to scroll down to the bottom of the chat container
watch(() => [messages, selectedUser], () => {
    scrollToBottom();
});


// watch the changes to the search query
    // watch(searchQuery, async (newValue) => {
    
    //     // console.log(searchResults.value);
    // });

watchEffect(async()=>{
     searchResults.value = await searchUsersByName(searchQuery.value);
})


// watcher because the auth is async nature in firebase
watch(() => mainStore.user, async (newUser, oldUser) => {
    // console.log('User changed:', newUser.uid, newUser.uid);
    // preventing the scenarion when user might change multiple times
    if (!oldUser?.uid || (oldUser.uid !== newUser.uid)) {
        await fetchAllUsers();
        await fetchChatUsers();
    }
});



// since audio is not available on the client side we use it after mounting
onMounted(async () => {
    // Create an audio element
    messageReceivedAudio = new Audio("/incoming-noti.mp3");
    if(mainStore.user){
        await fetchAllUsers();
        await fetchChatUsers();
    }
});

// function to scroll to botttom
const scrollToBottom = () => {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
    });
};

</script>


<template>
    <div class="w-screen flex h-[95vh] bg-purple-950">
        <div class="min-w-[300px] border-r-2">
            <div class="w-full">
                <input class="w-full p-1 text-center" type="text" placeholder="Search user" v-model="searchQuery"
                    @click.stop="toggleSearchResultModal">
            </div>
            <Transition>
            <SearchResult v-if="showSearchResultModal" :users="searchResults"
                :handleSearchModalClick="handleSearchModalClick" />
            </Transition>

            <div v-if="!showSearchResultModal" class="w-full">
                <ul class="m-1 text-white overflow-y-scroll h-full">
                    <li class="flex gap-2 itemsendMessages-center cursor-pointer borderchatUsers-b-[1px] p-2"
                        @click="handleOpenChat(user)" v-for="user in chatUsers" :key="user">
                        <img class="w-[20px] h-[20px] rounded-full" :src="`/profile-logo.jpg`" alt="Profile Image" />
                        <span>{{ user?.displayName }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="grow relative flex flex-col text-white m-auto h-full">
            <h1 v-if="selectedUser?.displayName" class="text-white-800 font-bold text-3xl text-center">Chat with {{
                selectedUser?.displayName }}</h1>
            <h1 v-else class="text-white-800 font-bold text-3xl text-center">chit chat</h1>
            <hr />
            <div v-if="messages === null" class="relative font-bold text-lg m-auto top-[45%]"> Select a user to start
                chatting </div>

            <div class="relative h-full w-full flex flex-col max-h-[96%]">
                <div class="relative grow overflow-y-scroll py-2" ref="chatContainer">
                    <div v-if="messages?.length === 0"
                        class="relative font-bold text-lg flex items-center justify-center h-full">
                        No chat exist with the user yet
                    </div>

                    <div v-else-if="messages?.length > 0" class="p-3 my-1" v-for="message in messages" :key="message.id"
                        :class="{ 'text-right': message.uid === mainStore.user.uid, 'text-left': message.uid !== mainStore.user.uid }">
                        <span>{{ message.text }}</span>
                        <span class="text-xs text-gray-500 block">{{ message.sender }}</span>
                    </div>
                </div>
                <!-- Input and submit button -->
                <div class="flex w-full bottom-0 m-1">
                    <input class="grow text-black p-2 outline-none rounded-l-lg max-w-[70%] md:max-w-[80%]"
                        v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." />
                    <button class="p-2 grow bg-blue-700 rounded-r-lg max-w-[30%] md:max-w-[20%]"
                        @click="sendMessage">Submit</button>
                </div>
            </div>

        </div>
    </div>
</template>



<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>