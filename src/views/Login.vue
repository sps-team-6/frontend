<template>
  <div id="login">
    <h1>Login</h1>
    <br><br>
    <v-text-field outlined v-model="input.username" placeholder="Username"></v-text-field>
    <br><br>
    <v-btn v-on:click="login()">Login</v-btn>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: ""
                }
            }
        },
        methods:{
            login(){
                if (this.input.username !== ""){
                    this.$router.replace('/lobby');
                }
                else{
                    window.alert("Please enter a username");
                }
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>