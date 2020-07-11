<template>
  <div class="clicking-game">
    <div class="a">
      <h1>Click this button as fast as possible!</h1>
    </div>

    <div class="counter">
      <h2>Count:</h2>
      <div ref="countValue" id="countValue"><h2>{{ count }}</h2></div>
      <button v-on:click="checkTimerButton" class="btn btn-primary">Press Me!</button>
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

window.onload = function() {
  // TODO: this only works when page is reloaded, and not when is toggled to.
  alert("Start game?");
}

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
      count: 0,
    }
  },
  methods: {
    incrementCount: function() { // TODO: prevent overflows.
      this.count += 1
      this.bars[0].numClicks += 1;
    },
    checkTimerButton: function() {
      var timerValue = document.getElementById('timer').textContent;
      if (timerValue > 0) {
        this.incrementCount();
      } else {
        // TODO: this shd be when timer is 0 regardless of whether the button is clicked or not.
        alert("Game over! The winner is " + this.getWinner()); 
      }
    },
    getWinner: function() {
      var max = 0;
      var playerName = "";
      for (var i = 0; i < this.bars.length; i++) {
        var bar = this.bars[i];
        if (bar.numClicks > max) {
          max = bar.numClicks;
          playerName = bar.name;
        }
      }
      return playerName;
    },
  },
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
