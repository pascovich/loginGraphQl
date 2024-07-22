<template>
  <div class="loading-container">
    <q-spinner-gears color="primary" size="5em" />
  </div>
</template>

<script setup>
defineOptions({
  name: "Loading",
});
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20;
  width: 20;
  background-color: #fff;
}
</style>
