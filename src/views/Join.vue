<template>
  <div id="join">
    <h1>Join Group</h1>
    <br><br>
    <input type="text" name="groupid" v-model="input.groupid" placeholder="Group ID">
    <br><br>
    <v-btn>Join</v-btn> 
  </div>
</template>

<script>
export default {
    name:"Join",
    data() {
        return {
            input: {
                groupid: ""
            }
        }
    },
}
</script>

<style scoped>
    #join {
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
</style>