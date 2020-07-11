<template>
    <v-container>
        <v-row>
            Instructions: Type in the input box, and press space to submit a word.
        </v-row>
        <v-row>
            <div id="typing-game">
                <div id="text-display"></div>
                <input id="input-field" type="text" />
            </div>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data: function() {
            return {
                wordList: ["Help", "me", "what", "am", "I", "doing.", "The", "quick", "brown", "fox",
                    "jumped", "over", "the", "lazy", "dog"],
                currentWord: 0,
                correctWords: 0,
                incorrectWords: 0,
            }
        },
        mounted: function() {
            this.showText()
            this.registerHandler()
        },
        methods: {
            showText: function() {
                const textDisplay = document.getElementById('text-display')
                this.wordList.forEach(word => {
                    const span = document.createElement("span")
                    span.innerText = word + " "
                    textDisplay.appendChild(span)
                })
                textDisplay.firstChild.classList.add('highlighted')
            },
            registerHandler: function() {
                const textDisplay = document.getElementById('text-display')
                const inputField = document.getElementById("input-field")
                inputField.addEventListener("keydown", e => {
                    // space represents submission of a word
                    const currentWord = this.currentWord
                    const wordList = this.wordList
                    const incorrectWords = this.incorrectWords
                    const correctWords = this.correctWords
                    if (e.key === " ") {
                        // don't register space as a key
                        e.preventDefault()

                        // correct input
                        if (inputField.value === wordList[currentWord]) {
                            this.correctWords = correctWords + 1
                            textDisplay.childNodes.item(currentWord).classList.add('correct')
                        }
                        // incorrect input
                        else {
                            this.incorrectWords = incorrectWords + 1
                            textDisplay.childNodes.item(currentWord).classList.add('incorrect')
                        }

                        if (currentWord < wordList.length - 1) {
                            // highlight the next word
                            textDisplay.childNodes.item(currentWord + 1).classList.add('highlighted')
                        } else {
                            console.log("finished!", `Correct: ${correctWords}`, `Incorrect: ${incorrectWords}`)
                        }

                        inputField.value = ""
                        this.currentWord = currentWord + 1
                    }
                })
            },
        },
    }
</script>

<style>
    #typing-game {
        display: inline-block;
        padding: 32px;
        border: 1px solid black;
        border-radius: 16px;
        min-height: 300px;
        width: 50%;
        background: lightgrey;
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
</style>
