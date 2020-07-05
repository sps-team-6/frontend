<template>
  <div class="clicking-game">
    <div class="a">
      <h1>clicking game yeay</h1>
    </div>
    <div class="progress-bar">
      <Bars v-bind:bars="bars"></Bars>
    </div>
  </div>
</template>

<script>
import Bars from '../components/clickinggame/Bars';

export default {
    name: 'ClickingGame',
    components: {
      Bars,
    },
    data() {
      return {
        bars: [
          { name:"player 1", percent: 90, color: "#ec407a" },
          { name:"player 2", percent: 76, color: "#f4511e" },
          { name:"player 3", percent: 84, color: "#512da8" }
        ]
      }
    }
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }
</style>