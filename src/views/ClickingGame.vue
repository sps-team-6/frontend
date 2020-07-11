<template>
  <div class="clicking-game">
    <div class="a">
      <h1>Click this button as fast as possible!</h1>
    </div>

    <div class="counter">
      <h2>Count:</h2>
      <div ref="countValue" id="countValue"><h2>{{ count }}</h2></div>
      <button v-on:click="incrementCount" class="btn btn-primary">Press Me!</button>
    </div>

    <div class="timer">
      <Timer></Timer>
    </div>

    <div class="progress-bar">
      <Bars v-bind:bars="bars"></Bars>
    </div>
  </div>
</template>

<script>
import Bars from '../components/clickinggame/Bars';
import Timer from '../components/clickinggame/Timer';

export default {
    name: 'ClickingGame',
    components: {
      Bars,
      Timer,
    },
    data() { // Alternatively, can create a .js data file, but for now this shall suffice.
      return {
        bars: [
          { name:"player 1", numClicks: 0, color: "#c7b198" },
          { name:"player 2", numClicks: 56, color: "#dfd3c3" },
          { name:"player 3", numClicks: 74, color: "#f0ece3" }
        ],
        count: 0
      }
    },
    methods: {
      incrementCount: function() {
        this.count += 1
        this.bars[0].numClicks += 1;
      }
    },
    computed: {
    percent() {
      return this.percentage.toFixed();
    }
    },
    created() {
      var intval = setInterval(() => {
        if(this.percentage < 100)
          this.percentage += .1;
        else
          clearInterval(intval);
      }, 10);
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

  .counter {
    padding: 15px;
  }

  .btn {
    background-color: #84a9ac; /* Green */
    border: none;
    border-radius: 10px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
  }

  .btn:hover {
    background-color: #3b6978;
  }

  .btn:focus {
    outline: 0;
  }
</style>
