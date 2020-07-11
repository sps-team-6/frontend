<template>
  <div class="bars">
    <div class="bar" v-bind:key="bar.id" v-for="bar in bars">
      <BarItem v-bind:bar="bar" />
    </div>
  </div>
</template>

<script>
import BarItem from './BarItem.vue';

export default {
  name: "Bars",
  components: {
    BarItem
  },
  props: ['bars'],
}
</script>

<style scoped>
  .bars {
    padding: 30px;
    margin: 30px;
    /* transform: rotateZ(-90deg); */
  }
</style>
