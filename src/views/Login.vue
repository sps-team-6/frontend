<template>
  <div id="login">
    <h1>Login</h1>
    <br><br>
    <input type="text" name="username" v-model="input.username" placeholder="Username">
    <br><br>
    <v-btn type ="button">Create Group</v-btn> 
    <div id="divider"></div>
    <v-btn @click="$router.push('join')">Join Group</v-btn>
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
        join(){
            if (this.input.username != ""){
                this.Vuerouter.push({ path: '/join'});
            }
            else{
                console.log("Pls enter a username");
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
    #button{
        border-color: black;
        block-size:auto;
        color:grey;
    }
    #divider{
    width:100px;
    height:auto;
    display:inline-block;
    }
</style>