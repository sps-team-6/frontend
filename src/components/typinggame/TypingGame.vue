<template>
    <div>
        <div id="text-display">

        </div>
        <input id="input-field" type="text" />
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                wordList: ["Help", "me", "what", "am", "I", "doing"],
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
                const inputField = document.getElementById("input-field")
                inputField.addEventListener("keydown", e => {
                    // space represents submission of a word
                    if (e.key === " ") {

                        console.log("HELLO WORLD")
                    }
                })
            },
        },
    }
</script>

<style>
.highlighted {
    color: lightslategray;
}
</style>