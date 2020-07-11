<template>
    <v-container fluid id="container">
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
                    label="Enter text"
                    id="input-field"
                    v-model="inputText"
                    v-on:keydown.space.prevent="handleInput"
                >
                </v-text-field>
            </v-card>
        </v-row>
        <v-row>
            <v-col>
                <v-btn text>{{ 0 }} WPM</v-btn>
            </v-col>
            <v-col>
                <v-btn text>{{ incorrectWords }} mistyped</v-btn>
            </v-col>
            <v-col>
                <countdown></countdown>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import wordBank from "./text/text"
    import CountDown from '../Countdown/CountDown'

    export default {
        data: function() {
            return {
                wordList: [],
                currWordIdx: 0,
                correctWords: 0,
                incorrectWords: 0,
                inputText: "",
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
                this.wordList = Array.from(wordBank.lorem)
            },
            showText: function() {
                console.log(this.wordList)
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
        },
        components: {
            'countdown': CountDown
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
    .highlighted {
        color: blueviolet;
    }
    .correct {
        color: green;
    }
    .incorrect {
        color: crimson;
    }
    #container {
        width: 50%;
    }
    .v-avatar {
        margin: 8px;
    }
</style>
