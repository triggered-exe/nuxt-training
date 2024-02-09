<script setup>

const WIN_CASES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const route = useRoute();
const queryId = route.query.queryId;
const qrCodeURL = ref(null);
const shareUrl = ref(null)
const showBoard = ref(false)
const host = ref(null)
const noti = ref(null)
let peer, connection;
const turn = ref(false)
const selections = {
    player: ref([]),
    opponent: ref([])
};


const initializePeer = async () => {
    peer = new Peer();
    peer.on('open', (id) => {
        console.log('connection opened');
        // for guest
        if (queryId) {
            console.log('guest :  queryId is: ', queryId);
            connection = peer.connect(queryId);
            connection.on('open', () => {
                handleMessage(connection);
                console.log('Guest initiated', 'info');
                sendMessage({
                    type: 'connection-established',
                    message: 'guest',
                });
            });
        } else {
            // for host
            generateQR(id);
            peer.on('connection', (conn) => {
                connection = conn;
                console.log('guest connected', connection);
                handleMessage();
            });
        }
    });
};

const handleMessage = () => {
    connection.on('data', (data) => {
        const { type, message } = JSON.parse(data);
        console.log('data received ---  type: ', type, " message: ", message)
        switch (type) {
            case 'connection-established':
                console.log(`Connected to ${message}`, 'success')
                // if message is from the guest
                if (message === 'guest') {
                    // send the confirmation to the host to generate the toss
                    sendMessage({
                        type: 'connection-established',
                        message: 'host',
                    })
                    qrCodeURL.value = null;
                    shareUrl.value = null;
                    showBoard.value = true;
                }
                // if the confirmation message is from the host then proceed with thetoss
                else {
                    const toss = Math.random() > 0.5
                    // generatr the toss and send to the host
                    sendMessage({
                        type: 'toss',
                        message: toss,
                    })
                    showBoard.value = true;
                }
                break
            case 'toss':
                // initially host will get this data
                if (host.value === null) {
                    // set the turn value and then send the other value to guest
                    turn.value = message
                    console.log(`Is player 1: ${message}`, message ? 'success' : 'fail')
                    host.value = message
                    sendMessage({
                        type: 'toss',
                        message: !message,
                    })
                    message ? handleNotification('You go first') : handleNotification('You go second')
                }
                break
            case 'selected':
                // other user has selected and now its your turn
                selections.opponent.value.push(message)
                turn.value = true
                console.log(`Opponent selected cell: ${message}`, 'message')
                if (WIN_CASES.some(chance => chance.every(cell => selections.opponent.value.includes(cell)))) {
                    console.log('You Lost!', 'fail')
                    handleNotification('You Lost!')
                    resetGame(false); // Reset game state
                }
                else if (selections.player.value.length + selections.opponent.value.length === 9) {
                    console.log('Draw Match!', 'message')
                    handleNotification('Draw Match!')
                    resetGame(true); // Reset game state
                }
                break
            default:
                console.error(`Invalid data type ${type}`, message)
        }
    })
}

const handleCellClick = (index) => {
    console.log(index)
    if (!turn.value) {
        handleNotification('its not your turn')
        return;
    }
    if (selections.player.value.includes(index) || selections.opponent.value.includes(index)) {
        handleNotification('already selected');
        return;
    }
    console.log("turn: ", turn.value);

    selections.player.value.push(index)
    turn.value = false;

    sendMessage({
        type: 'selected',
        message: index,
    })

    if (WIN_CASES.some(chance => chance.every(cell => selections.player.value.includes(cell)))) {
        console.log('You Won!!!', 'success')
        handleNotification('You Won!!!')
        resetGame(true); // Reset game state
    }
    else if (selections.player.value.length + selections.opponent.value.length === 9) {
        console.log('Draw Match!', 'message')
        handleNotification('Draw Match!')
        resetGame(false); // Reset game state
    }
}



const resetGame = (bool) => {
    selections.player.value = [];
    selections.opponent.value = [];
    turn.value = bool;
};


const sendMessage = message => connection.send(JSON.stringify(message))

const generateQR = id => {
    shareUrl.value = `${location.href}?queryId=${id}`
    qrCodeURL.value = `https://api.qrserver.com/v1/create-qr-code/?data=${shareUrl.value}`
    // console.log(qrCodeURL.value)
}

const handleQRCodeClick = async () => {
    navigator.clipboard.writeText(shareUrl.value);
    handleNotification('url copied to clipboard')
};


const handleNotification = (message) => {
    noti.value = message;
    setTimeout(() => {
        noti.value = null;
    }, 3000)
}

onMounted(() => {
    console.log('initializing');
    initializePeer();
});

</script>


<template>
    <div class="text-white w-full h-full bg-slate-500 flex items-center justify-center">
        <div class="notification" v-if="noti">
            <span>{{ noti }}</span>
        </div>
        <div class="flex flex-col gap-2" v-if="qrCodeURL">
            <img :src="qrCodeURL" class="m-auto" @click="handleQRCodeClick" />
            <label class="p-2 border-2 border-black" @click="handleQRCodeClick">Click to copy the URL</label>
        </div>
        <div class="flex w-[90vw] aspect-square	 max-w-[700px] border-blue-700 bg-slate-700 flex-wrap" v-if="showBoard">
            <div class="min-w-[33.3%] min-h-[33.3%] max-w-[33.3%] border-2 border-white flex justify-center items-center cursor-pointer"
                v-for="(cell, index) in new Array(9)" :key="index" @click="handleCellClick(index)">
                <!-- host will get X and guest will get -->
                <img class="object-cover" v-if="selections.opponent.value.includes(index)" :src="host ? '/o.png' : '/x.png'"
                    alt="Opponent" />
                <img class="object-cover" v-else-if="selections.player.value.includes(index)"
                    :src="host ? '/x.png' : '/o.png'" alt="Player" />
                <span v-else> click me!! </span>
            </div>
        </div>
        <div v-if="!showBoard && !qrCodeURL" class="m-auto flex justify-center">
        <h1>Invalid Url ..........check Again</h1>
        </div>
    </div>
</template> 
  
<style scoped>
@keyframes slideIn {
    from {
        top: -100px;
    }

    to {
        top: 50px;
    }
}
.notification {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid #1a5311;
    background-color: #4caf50;
    padding: 8px;
    min-width: 44px;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    animation: slideIn 0.5s ease-in-out forwards;
}
</style>
