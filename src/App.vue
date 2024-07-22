<template>
  <!-- <div v-if="loadingspinner" class="text-center"> -->
  <BeforeFetch v-if="load" />
  <!-- <loading v-if="load" /> -->
  <!-- </div> -->
  <router-view v-else />
</template>

<script setup>
import BeforeFetch from "./components/HomeLoadingComponent.vue";
// import loading from "./components/Loading.vue";
import { onBeforeMount, onMounted, ref } from "vue";

defineOptions({
  name: "App",
});
const load = ref(true);

onBeforeMount(() => {
  load.value = true;
});

onMounted(() => {
  setTimeout(() => {
    load.value = false;
  }, 2000);
});
</script>
