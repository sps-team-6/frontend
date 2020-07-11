<template>
    <div>{{ countDown }}</div>
</template>

<script>
    export default {
        props: {
            start: {
                type: Number,
                default: 60,
            }
        },
        data() {
            return {
                countDown : this.start
            }
        },
        methods: {
            countDownTimer: function() {
                if(this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
            }
        },
        created: function() {
            this.countDownTimer()
        }
    }
</script>