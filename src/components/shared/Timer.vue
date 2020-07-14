<!--
Count down timer that emits a timerValue event every tick.

Accepts an initial start value.
Can be styled as an inline or block element.
If the frozen prop is true, the timer will not start until frozen is set to false.

Please use v-bind for custom styling: <Timer :style="style" />
-->
<template>
    <span v-if="inline">{{ timerCount }}</span>
    <div v-else>{{ timerCount }}</div>
</template>

<script>
    export default {
        data() {
            return {
                timerCount: this.initial,
                started: false
            }
        },
        props: {
            initial: {
                type: Number,
                required: true,
            },
            frozen: {
                type: Boolean,
                default: false,
            },
            inline: {
                type: Boolean,
                default: false,
            }
        },
        methods: {
            countDown: function() {
                this.$emit("timerValue", this.timerCount);
                if (this.timerCount > 0) {
                    setTimeout(() => {
                        this.timerCount--;
                        this.countDown();
                    }, 1000);
                }
            }
        },
        watch: {
            frozen: {
                handler: function(newFrozen) {
                    if (!newFrozen && !this.started) {
                        this.started = true
                        this.countDown();
                    }
                },
                immediate: true
            }
        }
    }
</script>
