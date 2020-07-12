<template>
  <div id="login">
    <h1>Login</h1>
    <br><br>
    <input type="text" name="username" v-model="input.username" placeholder="Username">
    <br><br>
    <button type ="button">Create Group</button> <button type = "button">Join Group</button>
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
    #button{
        border-color: black;
    }
</style>