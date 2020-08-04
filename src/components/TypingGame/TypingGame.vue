<template>
    <v-container fluid id="tg__container">
        <v-app-bar dark dense app>
            <router-link :to="'/lobby/' + userToken">
                <v-btn icon>
                    <v-icon large>home</v-icon>
                </v-btn>
            </router-link>
            <router-link to="/">
                <v-btn>
                    Switch user
                </v-btn>
            </router-link>
            <v-spacer></v-spacer>
            <v-icon>account_circle</v-icon>
            <div :class="userToken === 'ABCD' || userToken === 'BCDE' ? 'ml-2 red--text' : 'ml-2 blue--text'">
                {{ userToken }}
            </div>
        </v-app-bar>

        <v-dialog v-model="isDialog" max-width="30%">
            <v-card class="mx-auto" min-height="30%">
                <v-card-title>
                    <p class="display-1 text--primary">Results</p>
                </v-card-title>
                <v-card-subtitle>
                    <p class="text-primary">Game over! Winner: {{ winner["userId"] }}</p>
                </v-card-subtitle>
            </v-card>
        </v-dialog>
        <v-row justify="center">
            <v-avatar v-for="player in players" :key="player.id" class="tg__avatar" size="128" :color="player.group === 1 ? 'red' : 'blue'">
                <div>{{ player.userToken.toUpperCase() || "##" }}</div>
                <div>Score: {{ player.score }}</div>
                <div>{{ player.ready ? 'Ready' : 'Not ready' }}</div>
                <div>Group: {{ player.group }}</div>
            </v-avatar>
        </v-row>
        <v-row justify="center">
            <v-card id="tg__typing-game">
                <div id="tg__text-display"></div>
                <v-text-field
                    outlined
                    :disabled="isGameOver"
                    label="Start typing here!"
                    id="input-field"
                    v-model="inputText"
                    v-on:keydown.space.prevent="handleInput"
                >
                </v-text-field>
            </v-card>
        </v-row>
        <v-row>
            <v-col>
                <v-btn text>{{ wpm }} WPM</v-btn>
            </v-col>
            <v-col>
                <v-btn text>{{ incorrectWords }} mistyped</v-btn>
            </v-col>
            <v-col>
                <v-btn text><Timer inline :initial="timer" :frozen="!timerStarted" @timerValue="handleTime" /></v-btn>
            </v-col>
            <v-col>
                <v-btn v-on:click="onReady()" :color="this.isReady ? 'green' : 'red'">Ready</v-btn>
            </v-col>
        </v-row>
        <v-snackbar v-model="isSnackbar" :timeout="1000">
            Game started!
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="isSnackbar=false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
    import wordBank from "./text/text"
    import Timer from "../shared/Timer"
    import io from "socket.io-client"

    const TIME = 60;
    const socket = io(process.env.BASE_URL)

    export default {
        name: "TypingGame",
        components: {
            Timer
        },
        props: ['socket', 'userToken', 'roomNo'],
        data: function() {
            return {
                // for typing game
                wordList: [],
                currWordIdx: 0,
                correctWords: 0,
                incorrectWords: 0,
                inputText: "",
                // for timer
                timer: TIME,
                timerStarted: false,
                isSnackbar: false,
                isDialog: false,
                // for real-time user score bar
                players: [],
                isReady: false,
                winner: {}
            }
        },
        computed: {
            wpm: function() {
                const elapsedMins = ((TIME - this.timer) / 60) || 1
                return Math.floor(this.correctWords / elapsedMins)
            },
            isGameOver: {
                get: function() {
                    return this.timer <= 0 || this.currWordIdx >= this.wordList.length
                },
                set: function(value) {
                    this.isGameOver = value
                }
            }
        },
        created: function() {
            console.log('joined typing game, room: ', this.roomNo)
            socket.on('joinStatus', res => {
                console.log(res)
                if (res.players) {
                    this.updatePlayers(res.players);
                }
            })
            socket.on('leaveStatus', res => {
                console.log(res)
                if (res.players) {
                    this.updatePlayers(res.players);
                }
            })
            socket.on('readyStatus', res => {
                console.log(res)
                if (res.players) {
                    this.updatePlayers(res.players);
                }
            })
            socket.on('start', () => {
                if (!this.timerStarted) {
                    this.timerStarted = true
                    this.isSnackbar = true
                }
            })
            socket.on('typingResponse', res => {
                console.log(res)
                if (res.status === "typing succeeded") {
                    res["scores"].forEach(score => {
                        const player = this.players.find(o => o.userToken === score["userId"])
                        player.score = score["score"]
                    })
                }
            })
            socket.on('completeResponse', res => {
                console.log(res)
                if (res["leaderboard"][0]) {
                    this.winner = res["leaderboard"][0]
                }
                this.isDialog = true
            })
        },
        beforeMount: function() {
            this.loadText()
        },
        mounted: function() {
            this.showText()
            socket.emit('join', { gameType: "typing", roomNo: Number(this.roomNo), userToken: this.userToken })
        },
        beforeDestroy: function() {
            socket.emit('leave', { gameType: "typing", roomNo: Number(this.roomNo), userToken: this.userToken })
        },
        methods: {
            updatePlayers: function(players) {
                this.players = Object.keys(players).map(token => {
                    // properties: userToken, username, group, ready, score
                    return {
                        ...players[token].userInfo,
                        ready: players[token].ready,
                        score: players[token].score
                    }
                })
            },
            loadText: function() {
                this.wordList = Array.from(wordBank.pap)
            },
            showText: function() {
                const textDisplay = document.getElementById('tg__text-display')
                this.wordList.forEach(word => {
                    const span = document.createElement("span")
                    span.innerText = word + " "
                    textDisplay.appendChild(span)
                })
                textDisplay.firstChild.classList.add('tg--highlighted')
            },
            handleInput: function() {
                const textDisplay = document.getElementById('tg__text-display')
                const idx = this.currWordIdx
                const words = this.wordList

                // correct input
                if (this.inputText === words[idx]) {
                    this.correctWords++
                    textDisplay.childNodes.item(idx).classList.add('tg--correct')
                }
                // incorrect input
                else {
                    this.incorrectWords++
                    textDisplay.childNodes.item(idx).classList.add('tg--incorrect')
                }
                // highlight the next word (if any)
                if (idx < words.length - 1) {
                    textDisplay.childNodes.item(idx + 1).classList.add('tg--highlighted')
                }

                this.inputText = ""
                this.currWordIdx++
            },
            handleTime: function(seconds) {
                this.timer = seconds
                if (seconds > 0) {
                    socket.emit('typing', { gameType: "typing", roomNo: Number(this.roomNo), score: this.wpm })
                } else {
                    socket.emit('complete', { gameType: "typing", roomNo: Number(this.roomNo), score: this.wpm })
                }
            },
            onReady: function() {
                this.isReady = true
                socket.emit('ready', { gameType: "typing", roomNo: Number(this.roomNo) })
            }
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');

    .tg__avatar {
        margin: 8px;
        flex-direction: column;
    }
    #tg__typing-game {
        padding: 16px;
        margin: 8px;
        border-radius: 16px;
    }
    #tg__text-display {
        font-family: 'Courier Prime', monospace;
        height: 40vh;
        margin: 8px;
        text-align: left;
        overflow: scroll;
        overflow-x: hidden;
    }
    #tg__container {
        width: 70%;
    }
    .tg--highlighted {
        color: blueviolet;
    }
    .tg--correct {
        color: green;
    }
    .tg--incorrect {
        color: crimson;
    }
</style>
