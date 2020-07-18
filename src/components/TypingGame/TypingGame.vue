<template>
    <v-container fluid id="tg__container">
        <v-dialog v-model="isGameOver" max-width="30%">
            <v-card class="mx-auto" min-height="30%">
                <v-card-title>
                    <p class="display-1 text--primary">Results</p>
                </v-card-title>
                <v-card-subtitle>
                    <p class="text-primary">Game over! Your final score: {{ wpm - incorrectWords }}</p>
                </v-card-subtitle>
            </v-card>
        </v-dialog>
        <v-row justify="center">
            <v-avatar v-for="player in players" :key="player.id" class="tg__avatar" size="64" color="red lighten-4">
                <div>{{ player.name.substring(0, 2).toUpperCase() || "##" }}</div>
                <div><strong>{{ player.score }}</strong></div>
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
                    v-on:keydown.once="handleStart"
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
        </v-row>
    </v-container>
</template>

<script>
    import wordBank from "./text/text"
    import Timer from "../shared/Timer"
    import io from "socket.io-client"

    const TIME = 60;
    const socket = io(process.env.VUE_APP_SERVER_URL)

    export default {
        name: "TypingGame",
        components: {
            Timer
        },
        props: ['roomNo'],
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
                // for real-time user score bar
                players: [],
            }
        },
        computed: {
            wpm: function() {
                const elapsedMins = ((TIME - this.timer) / 60) || 1
                return Math.floor(this.correctWords / elapsedMins)
            },
            isGameOver: function() {
                return this.timer <= 0 || this.currWordIdx >= this.wordList.length
            }
        },
        created: function() {
            console.log('joined typing game, room: ', this.roomNo)
            socket.on('joinStatus', res => {
                console.log(res)
            })
            socket.on('readyStatus', res => {
                // TODO: May have to change to object to ensure accuracy
                this.players = res.readyPlayers.map(id => ({ id, name: 'Anon', score: 0 }))
            })
            socket.on('typingResponse', res => {
                console.log(res)
            })
            socket.on('completeResponse', res => {
                console.log(res)
            })
            socket.on('disconnect', () => {
                console.log('user disconnected')
            })
        },
        beforeMount: function() {
            this.loadText()
        },
        mounted: function() {
            this.showText()
            socket.emit('join', { gameType: "typing", roomNo: Number(this.roomNo) })
            socket.emit('ready', { gameType: "typing", roomNo: Number(this.roomNo) })
        },
        methods: {
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
            handleStart: function() {
                if (!this.timerStarted) {
                    this.timerStarted = true
                }
            },
            handleTime: function(seconds) {
                this.timer = seconds
                if (seconds > 0) {
                    socket.emit('typing', { gameType: "typing", roomNo: 0, score: this.wpm })
                } else {
                    socket.emit('complete', { gameType: "typing", roomNo: 0, score: this.wpm })
                    console.log('done!')
                }
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
