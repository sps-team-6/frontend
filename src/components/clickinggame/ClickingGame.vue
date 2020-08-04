<template>
    <v-container fluid id="container">
        <v-app-bar dark dense app>
            <router-link :to="'/lobby/' + userToken">
                <v-btn icon>
                    <v-icon large>home</v-icon>
                </v-btn>
            </router-link>
            <router-link to="/">
                <v-btn>
                    Switch user
                </v-btn>
            </router-link>
            <v-spacer></v-spacer>
            <v-icon>account_circle</v-icon>
            <div :class="userToken === 'ABCD' || userToken === 'BCDE' ? 'ml-2 red--text' : 'ml-2 blue--text'">
                {{ userToken }}
            </div>
        </v-app-bar>

        <v-dialog v-model="isDialog" max-width="30%">
            <v-card class="mx-auto" min-height="30%">
                <v-card-title>
                    <p class="display-1 text--primary">Results</p>
                </v-card-title>
                <v-card-subtitle>
                    <p class="text-primary">Game over! Winner: {{ winner["userId"] }}</p>
                </v-card-subtitle>
            </v-card>
        </v-dialog>

        <v-row justify="center">
            <v-avatar v-for="player in players" :key="player.id" class="tg__avatar" size="128"
                      :color="player.group === 1 ? 'red' : 'blue'">
                <div>{{ player.userToken.toUpperCase() || "##" }}</div>
                <div>Score: {{ player.score }}</div>
                <div>{{ player.ready ? 'Ready' : 'Not ready' }}</div>
                <div>Group: {{ player.group }}</div>
            </v-avatar>
        </v-row>

        <div>
            <h1>Click this button as fast as possible!</h1>
        </div>

        <div>
            <button v-on:click="incrementScore" :disabled="isGameOver" class="btn btn-primary">Press Me!</button>
        </div>

        <v-row>
            <v-col>
                <v-btn text>score: {{ score }}</v-btn>
            </v-col>
            <v-col>
                <v-btn text>timer:
                    <Timer inline :initial="timer" :frozen="!timerStarted" @timerValue="handleTime"/>
                </v-btn>
            </v-col>
            <v-col>
                <v-btn v-on:click="onReady()" :color="this.isReady ? 'green' : 'red'">Ready</v-btn>
            </v-col>
        </v-row>

        <div class="progress-bar">
            <div v-for="player in players" :key="player.id">
                <div class="progress" v-bind:style="{'background':activeColor, 'width':updateWidth(player)}"></div>
                <span class="num-clicks">{{player.score}}</span>
                <div class="player-name">
                    {{player.userToken}}
                </div>
            </div>
        </div>

        <v-snackbar v-model="isSnackbar" :timeout="1000">
            Game started!
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="isSnackbar=false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
    import Timer from "../shared/Timer";
    import io from "socket.io-client";

    const TIME = 15;
    const socket = io(process.env.VUE_APP_SERVER_URL)

    export default {
        name: 'ClickingGame',
        components: {
            Timer,
        },
        props: ['socket', 'userToken', 'roomNo'],
        data() {
            return {
                activeColor: 'teal',
                score: 0,
                // for timer
                timer: TIME,
                timerStarted: false,
                isSnackbar: false,
                isDialog: false,
                // for real-time user score bar
                players: [],
                isReady: false,
                winner: {}
            }
        },
        computed: {
            isGameOver: {
                get: function () {
                    return this.timer <= 0
                },
                set: function (value) {
                    this.isGameOver = value
                }
            }
        },
        created: function () {
            console.log('joined clicking game, room: ', this.roomNo)
            socket.on('joinStatus', res => {
                console.log(res)
                if (res.players) {
                    this.updatePlayers(res.players);
                }
            })
            socket.on('leaveStatus', res => {
                console.log(res)
                if (res.players) {
                    this.updatePlayers(res.players);
                }
            })
            socket.on('readyStatus', res => {
                console.log(res)
                if (res.players) {
                    this.updatePlayers(res.players);
                }
            })
            socket.on('start', () => {
                if (!this.timerStarted) {
                    this.timerStarted = true
                    this.isSnackbar = true
                }
            })
            socket.on('clickingResponse', res => {
                console.log(res)
                if (res.status === "clicking succeeded") {
                    res["scores"].forEach(score => {
                        const player = this.players.find(o => o.userToken === score["userId"])
                        player.score = score["score"]
                    })
                }
            })
            socket.on('completeResponse', res => {
                console.log(res)
                if (res.leaderboard[0]) {
                    this.winner = res.leaderboard[0]
                }
                this.isDialog = true
            })
        },
        mounted: function () {
            socket.emit('join', {gameType: "clicking", roomNo: Number(this.roomNo), userToken: this.userToken})
        },
        beforeDestroy: function() {
            socket.emit('leave', {gameType: "clicking", roomNo: Number(this.roomNo), userToken: this.userToken})
        },
        methods: {
            updatePlayers: function(players) {
                this.players = Object.keys(players).map(token => {
                    // properties: userToken, username, group, ready, score
                    return {
                        ...players[token].userInfo,
                        ready: players[token].ready,
                        score: players[token].score
                    }
                })
            },
            updateWidth: function (player) {
                var valueToReduce = 7; // To prevent the bar from increasing too quickly.
                return player.score - valueToReduce + '%';
            },
            incrementScore: function () { // TODO: prevent overflows.
                this.score++;
            },
            handleTime: function (seconds) {
                this.timer = seconds
                if (seconds > 0) {
                    socket.emit('clicking', {gameType: "clicking", roomNo: Number(this.roomNo), score: this.score})
                } else {
                    socket.emit('complete', {gameType: "clicking", roomNo: Number(this.roomNo), score: this.score})
                }
            },
            onReady: function () {
                this.isReady = true
                socket.emit('ready', {gameType: "clicking", roomNo: Number(this.roomNo)})
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

    .progress-bar {
        padding: 30px;
        margin: 30px;
        vertical-align: middle;
    }

    .progress {
        float: left;
        padding: 15px;
    }

    .player-name {
        position: relative;
        padding: 15px;
        font-weight: bold;
    }
</style>
