<template>
  <div>
    <div class="text-center q-my-xl">
      <div class="text-subtitle2">{{ $t("hello") }}</div>
      <div class="text-h6">{{ $t("welcome") }}</div>
    </div>
    <div class="text-center q-my-xl">
      <q-avatar color="white">
        <img :src="logoRenova" width="100px" alt="imd" srcset="" />
      </q-avatar>
    </div>
    <div class="text-center q-mx-md q-mb-xs">
      <p class="">
        {{ $t("authDecsription") }}
      </p>
      <br /><br />
      <p class="text-secondary q-mb-xl text-bold">
        {{ $t("aboutRenovaa") }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { logo, logoRenova, api } from "../../../app/variables.js";

const { t } = useI18n();
</script>

<style scoped></style>
