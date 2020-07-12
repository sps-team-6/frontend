<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
      <router-link to="/login">Login</router-link>
    </div>
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
  padding:0;
  overflow: hidden;
  background-color: rgb(68, 64, 64);

}
#nav a{
  display: block;
  color: white;
  text-align: left;
  padding: 14px 14px;
  text-decoration: none;
}
v-btn{
    color :grey;
    border: grey;
    width: 20px;
    height: 20px;

}

</style>
