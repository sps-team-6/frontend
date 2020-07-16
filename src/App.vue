<template>
  <v-app id="app">
    <!-- for Material Icon usage. Don't remove -->
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">

    <v-app-bar dark dense app v-if="this.$route.path !== '/'">
      <router-link to="/home">
        <v-btn icon>
          <v-icon large>home</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <router-view name="default" />
    </v-main>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
