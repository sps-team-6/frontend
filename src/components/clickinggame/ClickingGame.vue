<template>
  <v-container fluid id="container">
    <v-dialog v-model="isGameOver" max-width="30%">
      <v-card class="mx-auto" min-height="30%">
        <v-card-title>
          <p class="display-1 text--primary">Results</p>
        </v-card-title>
        <v-card-subtitle>
          <p class="text-primary">Game over! Your final score: {{ score }}</p>
        </v-card-subtitle>
      </v-card>
    </v-dialog>

    <div class="a">
      <h1>Click this button as fast as possible!</h1>
    </div>

    <div class="score">
      <button v-on:click="incrementScore" :disabled="isGameOver" class="btn btn-primary">Press Me!</button>
    </div>

    <v-row>
      <v-col>
          <v-btn text>score: {{ score }}</v-btn>
      </v-col>
      <v-col>
          <v-btn text>timer: <Timer inline :initial="timer" @timerValue="handleTime" /></v-btn>
      </v-col>
    </v-row>

    <div class="progress-bar">
      <Bars v-bind:bars="bars"></Bars>
    </div>
  </v-container>
</template>

<script>
  import Bars from './Bars';
  import Timer from "../shared/Timer";

  import io from "socket.io-client";

  const TIME = 10;
  const socket = io(process.env.VUE_APP_SERVER_URL)

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
        ],
        score: 0,
        // for timer
        timer: TIME,
        timerStarted: false,
        // for real-time user score bar
        players: [],
      }
    },
    computed: {
      isGameOver: function() {
          return this.timer <= 0;
      }
    },
    created: function() {
      console.log('joined clicking game, room: ', this.roomNo)
      socket.on('joinStatus', res => {
          console.log(res)
      })
      socket.on('readyStatus', res => {
          // TODO: May have to change to object to ensure accuracy
          this.players = res.readyPlayers.map(id => ({ id, name: 'Anon', score: 0 }))
      })
      socket.on('clickingResponse', res => {
          console.log(res)
      })
      socket.on('completeResponse', res => {
          console.log(res)
      })
      socket.on('disconnect', () => {
          console.log('user disconnected')
      })
    },
    mounted: function() {
      socket.emit('join', { gameType: "clicking", roomNo: Number(this.roomNo) })
      socket.emit('ready', { gameType: "clicking", roomNo: Number(this.roomNo) })
    },
    methods: {
      incrementScore: function() { // TODO: prevent overflows.
        this.score++;
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
      handleTime: function(seconds) {
        this.timer = seconds
        if (seconds > 0) {
            socket.emit('clicking', { gameType: "clicking", roomNo: 0, score: this.score })
        } else {
            socket.emit('complete', { gameType: "clicking", roomNo: 0, score: this.score })
            console.log('done!')
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
