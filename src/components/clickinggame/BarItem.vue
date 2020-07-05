<template>
  <div class="bar-item">
      <p>
        {{bar.name}}
        {{bar.percent}}
      </p>
  </div>
</template>

<script>
export default {
  name: "BarItem",
  props: ["bar"],
}
</script>

<style scoped>
  .bar-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
  }
</style>