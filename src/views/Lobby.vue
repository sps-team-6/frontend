<template>
  <v-container fluid class="home__container">
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

    <v-dialog v-model="roomFullDialog" max-width="30%">
      <v-card>
        <v-card-title>Can't join room</v-card-title>
        <v-card-text>The room is full. Please try joining another room!</v-card-text>
      </v-card>
    </v-dialog>
    <div class="home__vertical">
      <div class="home__button">
        <v-btn text @click="isRoomsTyping = !isRoomsTyping">
          <v-avatar>
            <img alt="typing"
                 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAABKSko+Pj709PSlpaXV1dXPz8/s7Oy7u7uioqKtra00NDSJiYm2trZxcXHDw8NPT0/b29uWlpZ8fHxbW1sbGxvh4eENDQ2Hh4dpaWn39/fGxsYVFRU3NzchISEqKiouLi5kZGRVVVWSkpJCQkJT6cvnAAAEbklEQVR4nO2da3uiQAxG8QJeQMFbta21Wuv//4tbu31I0h1BtwzpxPd8zE7dHEAIEwajCAAAAAAAAAAAAAAAAAAAAAAAAAiXdTpZHbvBsRo/X6c36YTLoN4vOWon+TPWNX7PT9oZ/pRZzQ7Uzq8BKr+KI+3smmBeITjVTq4RKr6IW+3cmuGyYF87tWZILxsGfpX4Ijd+ltlPK04zD3LsZLvuh0eF37fzaMXBHCwn5vcy1M7GA0O+By0KRikT3Gon44WcBGtK11DpkWGhnYsf2EFaecoNFxLcaKfiCTJ80E7FE+wo1U7FE/a/h/bPpex6eNTOxQ+8pkm0k/ECr0s3100ch8aOKWYmFflhavRsIww7u3hubkfKndg0p3yqf9eZeVU8W1ZNE7XB2rfhx1laef6njUn9rK755ZdxC4od3UM1bkNxrKrYysS3ruKw24LiSFUxKl79K2pfGkdvvg1/wYTlYJFnLx4VlY9TDwynPWG4107IB7KHbvLmpb9nhivtbLwgHhQwd2/2Ca8nbDa4+FTJu3YufmB32W/aufiB3YLutHPxhPErYsQNX7RT8QQMw+eeDFVazan3+8LWeePTl37nvPUo5/aCf0b/Irl1wS9Fq4foX0ZR9Kydg2es78LzTrT8LTyzjHxOHP4Gsqh+TNhszBt27s5wc+oxauMiTHNND1eE6dGBVx4+lOE9C59ovvXQqw+LBtP3J01EPU7xrjsunoOjOVGxPIcmaJY8TMsdRU+RpsdjHqYuvGh7UFtXzFC+Vxhm7pSlIcVFI4meHhOGc7fhoAwveJjmVYU4XbVFp5x686JVIBYzwxCGMIQhDGF4s6H9K779qs0gMAwfGIYPDMMHhuFzd4b7ZOAiYaswOws2JlmW4XHiHJ/yj6FO85SH6QHzgoepOhS5lLP0G2euHyOuvre4UMuK2peqe1H70v8hXk5F20OsLlmVYbEQeUZZcsp3zVxcXC+6TVca8q0iDBe0+Xn4sQyLVam0a2EIQxjCEIYGDe1cDw/rxMVc1DRz9g+0s+K5c/yUh6mmGfFPJ5UtD9M7yHgua6ppnLl+/GHVXJtBYBg+MAwfGIYPDMPn7gz3xYhg5V3G49Su3LmHH3mYKtcVD1PJnvPwxBkuqKB9ZIMLKg7feVgsraiqvNkD0l13/Jou94Ue8IUud1GGRQ+Ytt5tdX+Nock+PgxhCEMYwtCAIV0PfRn2hwRbQn9yx7s8TCpPPEzPceU8TDtrwsJ9UlnwMKnEPExTTlMepgroX0ODwDB8YBg+MAwfGIYPDMPnZ5V3xe+A/SdUgP6OewsY3g4MYfgJDB0mMGwOGDa7/rC+99S8Ia0o9NR7ek1jgr1r/+COd3m4CVJ6Xc4T++yUGoW5e/SSh+k5uX8NDXIHhhvtDDyzET+FZJFetKwfFDSPrENik0EU7etHBcy5hEnqhwXMXBYG9oi/V0rWKF/Sum7jF2ba58iXPAzjfNa1xCxPtX/RBgAAAAAAAAAAAAAAAAAAAAAAALiZPywKm3zqbz9NAAAAAElFTkSuQmCC">
          </v-avatar>
          Typing Game
        </v-btn>
        <div class="home__rooms" v-if="isRoomsTyping">
          <div :key="idx" v-for="(room, idx) in rooms[ROOM_NAMES.typing]">
            <v-btn class="room__btn" color="red lighten-5" @click="joinTypingRoom(userToken, room.roomNo)">
              Room {{ room.roomNo }}
            </v-btn>
            <span>{{ room.currentPlayersCount }}/{{ room.maxPlayersCount }} players</span>
          </div>

          <v-btn text @click="getRooms">
            refresh room status
            <v-icon>refresh</v-icon>
          </v-btn>
        </div>
      </div>

      <div class="home__button">
        <v-btn text @click="isRoomsClicking = !isRoomsClicking">
          <v-avatar>
            <img alt="clicking"
                 src="data:image/png;base64,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">
          </v-avatar>
          Clicking Game
        </v-btn>
        <div class="home__rooms" v-if="isRoomsClicking">
          <div :key="idx" v-for="(room, idx) in rooms[ROOM_NAMES.clicking]">
            <v-btn class="room__btn" color="cyan lighten-5" @click="joinClickingRoom(userToken, room.roomNo)">
              Room {{ room.roomNo }}
            </v-btn>
            <span>{{ room.currentPlayersCount }}/{{ room.maxPlayersCount }} players</span>
          </div>
          <v-btn text @click="getRooms">
            refresh room status
            <v-icon>refresh</v-icon>
          </v-btn>
        </div>
      </div>

    </div>

  </v-container>
</template>

<script>
    export default {
        name: 'Lobby',
        props: ['userToken'],
        data: function () {
            return {
                isRoomsTyping: false,
                isRoomsClicking: false,
                roomFullDialog: false,
                rooms: {},
                ROOM_NAMES: {
                    typing: 'typing',
                    clicking: 'clicking'
                }
            }
        },
        methods: {
            // populates rooms object; returns { typing: [{roomNo, maxPlayersCount, currentPlayersCount]}, clicking: [...] }
            getRooms: async function() {
                const newRooms = {}
                await fetch(`https://secure-sierra-78883.herokuapp.com/rooms`)
                    .then(res => res.json())
                    .then(rooms => {
                        rooms.games.forEach(o => newRooms[o.name] = [...o.rooms])
                        this.rooms = newRooms
                    })
            },
            joinTypingRoom: async function(userToken, roomNo) {
                // get the latest data before trying to enter
                await this.getRooms()
                console.log('joining typing roomNo:', roomNo)
                console.log('current room status:', this.rooms)
                const currPlayers = this.rooms[this.ROOM_NAMES.typing][roomNo]['currentPlayersCount']
                const maxPlayers = this.rooms[this.ROOM_NAMES.typing][roomNo]['maxPlayersCount']
                if (currPlayers < maxPlayers) {
                    this.$router.push({ path: `/typing/${userToken}/${roomNo}`})
                } else {
                    this.roomFullDialog = true
                }
            },
            joinClickingRoom: async function(userToken, roomNo) {
                await this.getRooms()
                console.log('joining clicking roomNo:', roomNo)
                console.log('current room status:', this.rooms)
                const currPlayers = this.rooms[this.ROOM_NAMES.clicking][roomNo]['currentPlayersCount']
                const maxPlayers = this.rooms[this.ROOM_NAMES.clicking][roomNo]['maxPlayersCount']
                if (currPlayers < maxPlayers) {
                    this.$router.push({ path: `/clicking/${userToken}/${roomNo}`})
                } else {
                    this.roomFullDialog = true
                }
            }
        },
        beforeMount: function() {
            this.getRooms()
        }
    }
</script>

<!-- BEM style css naming -->
<style>
  .home__container {
    display: flex;
    height: 100%;
  }

  .home__vertical {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 0 auto;
  }

  .home__button {
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    padding: 20px;
  }

  .room__btn {
    margin: 8px;
  }
</style>

