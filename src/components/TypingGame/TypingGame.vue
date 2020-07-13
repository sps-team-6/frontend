<template>
    <v-container fluid id="container">
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
            <v-avatar color="pink">KA</v-avatar>
            <v-avatar color="red">JG</v-avatar>
            <v-avatar color="purple">CT</v-avatar>
        </v-row>
        <v-row justify="center">
            <v-card id="typing-game">
                <div id="text-display"></div>
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
                <v-btn text>{{ timer }} seconds left</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import wordBank from "./text/text"
    import io from "socket.io-client"

    const TIME = 10;
    console.log(process.env.VUE_APP_SERVER_URL)

    const socket = io(process.env.VUE_APP_SERVER_URL)
    socket.emit('join', { gameType: "typing", roomNo: 0 })
    socket.emit('ready', { gameType: "typing", roomNo: 0 })

    socket.on('joinStatus', res => {
        console.log(res)
    })
    socket.on('readyStatus', res => {
        console.log(res)
    })
    socket.on('typingResponse', res => {
        console.log(res)
    })
    socket.on('completeResponse', res => {
        console.log(res)
    })

    export default {
        data: function() {
            return {
                wordList: [],
                currWordIdx: 0,
                correctWords: 0,
                incorrectWords: 0,
                inputText: "",
                timer: TIME, // 60 seconds
                timerStarted: false
            }
        },
        computed: {
            wpm: function() {
                const timeInMins = ((TIME - this.timer) / 60) || 1
                return Math.floor(this.correctWords / timeInMins)
            },
            isGameOver: function() {
                return this.timer <= 0 || this.currWordIdx >= this.wordList.length
            }
        },
        beforeMount: function() {
            this.loadText()
        },
        mounted: function() {
            this.showText()
        },
        methods: {
            loadText: function() {
                this.wordList = Array.from(wordBank.pap)
            },
            showText: function() {
                const textDisplay = document.getElementById('text-display')
                this.wordList.forEach(word => {
                    const span = document.createElement("span")
                    span.innerText = word + " "
                    textDisplay.appendChild(span)
                })
                textDisplay.firstChild.classList.add('highlighted')
            },
            handleInput: function() {
                const textDisplay = document.getElementById('text-display')
                const idx = this.currWordIdx
                const words = this.wordList

                // correct input
                if (this.inputText === words[idx]) {
                    this.correctWords++
                    textDisplay.childNodes.item(idx).classList.add('correct')
                }
                // incorrect input
                else {
                    this.incorrectWords++
                    textDisplay.childNodes.item(idx).classList.add('incorrect')
                }
                // highlight the next word (if any)
                if (idx < words.length - 1) {
                    textDisplay.childNodes.item(idx + 1).classList.add('highlighted')
                }

                this.inputText = ""
                this.currWordIdx++
            },
            handleStart: function() {
                if (!this.timerStarted) {
                    this.countDownTimer(this.timer)
                    this.timerStarted = false
                }
            },
            countDownTimer: function(time) {
                this.timer = time
                if (time > 0) {
                    setTimeout(() => {
                        socket.emit('typing', { gameType: "typing", roomNo: 0, score: this.wpm })
                        this.countDownTimer(time - 1)
                    }, 1000)
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

    #text-display {
        font-family: 'Courier Prime', monospace;
        height: 40vh;
        margin: 8px;
        text-align: left;
        overflow: scroll;
        overflow-x: hidden;
    }
    #typing-game {
        padding: 16px;
        margin: 8px;
        border-radius: 16px;
    }
    #container {
        width: 50%;
    }
    .highlighted {
        color: blueviolet;
    }
    .correct {
        color: green;
    }
    .incorrect {
        color: crimson;
    }
    .v-avatar {
        margin: 8px;
    }
</style>
