<template>
  <div class="bar-item">
    <div class="bar-num-clicks">
      <div class="progress" v-bind:style= "{'background':bar.color, 'width':updateWidth(bar)}"></div>
      <span class="num-clicks">{{bar.numClicks}}</span>
    </div>
    <div class="bar-name">
      {{bar.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: "BarItem",
  props: ['bar'],
  methods: {
    updateWidth: function(bar) {
      return bar.numClicks+'%';
    }
  }
}
</script>

<style scoped>
  .bar-item {
    padding: 30px;
    margin: 30px;
  }

  .bar-num-clicks {
    vertical-align: middle;
  }

  .progress {
    float: left;
    padding: 15px;
  }

  .bar-name {
    position: relative;
    padding: 15px;
    font-weight: bold;
  }
</style>
