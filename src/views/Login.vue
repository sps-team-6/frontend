<template>
  <v-container id="login">
    <v-card>
      <v-card-title class="justify-center">
        Select User
      </v-card-title>
      <v-card-text>
        <v-btn
          class="user__btn"
          :key=idx v-for="(token, idx) in tokens"
          v-on:click="login(token.userToken)"
          :color="token.group === 1 ? 'red' : 'blue'"
        >
          {{ token.userToken }} (Group {{ token.group }})
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
    export default {
        name: 'Login',
        data: function() {
            return {
                tokens: [
                    { group: 1, userToken: "ABCD", userName: "User A" },
                    { group: 1, userToken: "BCDE", userName: "User B" },
                    { group: 2, userToken: "CDEF", userName: "User C" },
                    { group: 2, userToken: "DEFG", userName: "User D" }
                ]
            }
        },
        methods:{
            login(userToken) {
              // this.$router.push({ name: `/typing/${userToken}/${roomNo}`, params: { socket }})

              this.$router.push(`/lobby/${userToken}`);
            }
        }
    }
</script>

<style scoped>
  #login {
      width: 500px;
      background-color: #FFFFFF;
      margin: auto;
      margin-top: 200px;
      padding: 20px;
  }
  .user__btn {
    margin: 8px;
  }
</style>