<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-view/>
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  list-style-type: none;
  margin: 0;
  padding:10px;
  overflow: hidden;
  background-color: rgb(68, 64, 64);

}
#nav a{
  color: white;
  text-align: left;
  padding: 5%;
  text-decoration: none;
}
#v-btn{
    color :grey;
    border: grey;
    width: 20px;
    height: 20px;
}
#divider{
    width:800px;
    height:auto;
    display:inline-block;
 }

</style>
