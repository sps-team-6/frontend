<template>
    <div>{{ countDown }}</div>
</template>

<script>
    export default {
        props: {
            start: {
                type: Number,
                default: 5,
            },
            done: {
                type: Function
            }
        },
        data() {
            return {
                countDown: this.start
            }
        },
        methods: {
            countDownTimer: function() {
                if (this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                } else {
                    this.done()
                }
            }
        },
        created: function() {
            this.countDownTimer()
        }
    }
</script>