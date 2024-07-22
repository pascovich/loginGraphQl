<template>
  <div>
    <div>
      <div
        class="fullscreen pending text-white text-center q-pa-md flex flex-center"
      >
        <div>
          <img :src="logo" width="160px" alt="image" />

          <br />
          <q-spinner-dots class="" color="white" size="3em" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "HomePending",
});
import { logo, logoRenova } from "../../app/variables.js";
</script>

<style scoped></style>
