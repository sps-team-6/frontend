<template>
  <div class="clicking-game">
    <div class="a">
      <h1>Click button {{selectedButton}} as fast as possible!</h1>
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
    data() { // Alternatively, can create a .js data file, but for now this shall suffice.
      return {
        bars: [
          { name:"player 1", numClicks: 90, color: "#ec407a" },
          { name:"player 2", numClicks: 56, color: "#f4511e" },
          { name:"player 3", numClicks: 74, color: "#512da8" }
        ],
        buttons: ['A', 'B', 'C', 'D', 'E'],
        selectedButton: ''
      }
    },
    created() {
      const idx = Math.floor(Math.random() * this.buttons.length);
      this.selectedButton = this.buttons[idx];
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
