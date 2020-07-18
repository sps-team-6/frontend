<template>
  <v-container fluid id="container">
    <!-- <v-dialog v-model="isGameOver" max-width="30%">
      <v-card class="mx-auto" min-height="30%">
        <v-card-title>
          <p class="display-1 text--primary">Results</p>
        </v-card-title>
        <v-card-subtitle>
          <p class="text-primary">Game over! Your final score: {{ score }}</p>
        </v-card-subtitle>
      </v-card>
    </v-dialog> -->

    <div class="a">
      <h1>Click this button as fast as possible!</h1>
    </div>

    <div class="score">
      <h2>Score:</h2>
      <div ref="scoreValue" id="scoreValue"><h2>{{ score }}</h2></div>
      <button v-on:click="checkTimerButton" class="btn btn-primary">Press Me!</button>
    </div>

    <div class="timer">
      <Timer @timerValue="checkTimerValue"></Timer>
    </div>

    <div class="progress-bar">
      <Bars v-bind:bars="bars"></Bars>
    </div>
  </v-container>
</template>

<script>
  import Bars from '../components/clickinggame/Bars';
  import Timer from '../components/clickinggame/Timer';

  import io from "socket.io-client";

  console.log(process.env.VUE_APP_SERVER_URL)

  const socket = io(process.env.VUE_APP_SERVER_URL)
  socket.emit('join', { gameType: "clicking", roomNo: 0 })
  socket.emit('ready', { gameType: "clicking", roomNo: 0 })

  socket.on('joinStatus', res => {
      console.log(res)
  })
  socket.on('readyStatus', res => {
      console.log(res)
  })
  socket.on('typingResponse', res => {
      console.log(res)
  })
  socket.on('completeResponse', res => {
      console.log(res)
  })

  export default {
    name: 'ClickingGame',
    components: {
      Bars,
      Timer,
    },
    data() { // Alternatively, can create a .js data file, but for now this shall suffice.
      return {
        bars: [ // TODO: get the list of players from BE.
          { name:"player 1", numClicks: 0, color: "#c7b198" },
          { name:"player 2", numClicks: 56, color: "#dfd3c3" },
          { name:"player 3", numClicks: 74, color: "#f0ece3" }
        ],
        score: 0,
      }
    },
    computed: {
    },
    methods: {
      incrementScore: function() { // TODO: prevent overflows.
        this.score++;
        socket.emit('clicking', { gameType: "clicking", roomNo: 0, score: this.score });
        // socket.on('typingResponse', function( status, scores ) {
        //   this.score = scores[0];
        //   console.log("this.score: " + this.score);
        // });
        this.bars[0].numClicks += 1;
      },
      checkTimerButton: function() {
        var timerValue = document.getElementById('timer').textContent;
        if (timerValue > 0) {
          this.incrementScore();
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
      checkTimerValue: function(value) {
        if (value === 0) {
          socket.emit('complete', { gameType: "clicking", roomNo: 0, score: this.score });
          alert("Game over! The winner is " + this.getWinner()); 
        }
      }
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

  .score {
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
