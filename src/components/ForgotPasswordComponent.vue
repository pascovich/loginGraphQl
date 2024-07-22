<template>
  <div class="bg-primary">
    <div class="backPicture">
      <div
        class="row bg-white customer-card"
        :class="{ 'cardLoginPosition shadow-6 body': $q.screen.gt.sm }"
      >
        <div
          class="gt-sm col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 bg-primary"
        >
          <AuthInfoComponent />
        </div>
        <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12 bg-white">
          <div class="text-center">
            <div class="text-h6 q-mt-lg gt-sm text-bold">
              {{ $t("title") }}
            </div>
            <q-separator color="primary" class="gt-sm separator" inset />
            <div class="bg-primary header-div lt-md q-pt-lg">
              <div class="text-subtitle2 text-secondary">
                <br />
                <br />
                <q-avatar color="white">
                  <img :src="logoRenova" width="100px" alt="imd" srcset="" />
                </q-avatar>
              </div>
              <br />
              <br />
              <div class="text-h6 text-bold text-white">
                {{ $t("title") }}
              </div>
              <q-separator color="secondary " class="separatorLessThan" inset />
              <br />
            </div>

            <br />

            <div :class="{ 'bg-white inputBlock': $q.screen.gt.sm }">
              <br />
              <div
                class="q-px-xl"
                :class="{ 'q-mb-xl q-pb-md': $q.screen.lt.md }"
              >
                <q-form @submit.prevent="onSubmit">
                  <q-input
                    rounded
                    outlined
                    dense
                    v-model="LoginInput.phone"
                    :label="$t('phoneInput')"
                  >
                    <template v-slot:prepend>
                      <q-icon name="create" />
                    </template>
                  </q-input>
                  <br />
                  <p class="float-right">
                    {{ $t("rememberPwd") }}
                    <span>
                      <router-link
                        to="login"
                        style="text-decoration: none"
                        class="text-secondary text-bold"
                      >
                        {{ $t("signInLinkLabel") }}
                      </router-link>
                    </span>
                  </p>
                  <br /><br />
                  <div class="flex flex-center centerDiv">
                    <q-btn
                      unelevated
                      :tooltip="$t('loginBtn')"
                      type="submit"
                      rounded
                      color="primary"
                      class="text-center"
                      style="width: 200px"
                      icon="cloud_download"
                      :label="$t('loginBtn')"
                      :loading="loading"
                    />
                  </div>
                </q-form>
                <br />
                {{ $t("or") }}
                <br /><br />
                <div class="text-center q-gutter-md">
                  <q-avatar
                    size="md"
                    v-for="(data, index) in connectedWith"
                    :key="index"
                  >
                    <img :src="data.url" alt="img" srcset="" />
                  </q-avatar>
                </div>
                <br />
                {{ $t("authRegister") }}
                <span>
                  <router-link
                    to="SIgnUp"
                    style="text-decoration: none"
                    class="text-secondary text-bold"
                  >
                    {{ $t("signUpLinkLabel") }}
                  </router-link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import AuthInfoComponent from "./shared/LeftAuthComponent.vue";

import { logo, logoRenova, api } from "../../app/variables.js";
import axios from "axios";
import { LoginQuery } from "../../app/query/LoginQuery";
import { authStore } from "../stores/auth-store.js";
import { useI18n } from "vue-i18n";

import {
  resetFormFields,
  hasEmptyField,
  notificationFonction,
  insertQuery,
  LoadingLife,
  passwordVisibility,
  passwordIcon,
} from "../../app/utils/index";

const { t } = useI18n();
const inputType = ref("password");
const LoginInput = ref({
  phone: "",
  password: "",
});

const loading = ref(false);
const connectedWith = ref([
  { name: "fb", url: "./img/fb.png" },
  { name: "x", url: "./img/twitter.jpg" },
  { name: "apple", url: "./img/apple.png" },
]);
const store = authStore();

function togglePasswordVisibility() {
  passwordVisibility(inputType);
}

const passIcon = computed(() => {
  return inputType.value === "password" ? "visibility_off" : "visibility";
});

const onSubmit = async () => {
  if (hasEmptyField(LoginInput.value)) {
    notificationFonction(
      "Data are empty",
      "negative",
      "warning",
      "top",
      "error"
    );
    return;
  } else {
    loading.value = true;
    const query = await LoginQuery(
      LoginInput.value.phone,
      LoginInput.value.password
    );
    await insertQuery(`${api}/graphql`, { query })
      .then(async (res) => {
        if (res.data.errors.length > 0) {
          await notificationFonction(
            res.data.errors[0].message,
            "negative",
            "negative",
            "top-right",
            "error"
          );
        } else {
          await store.login(res, res.token);

          await notificationFonction(
            res.data.message,
            "positive",
            "primary",
            "bottom-right",
            "check"
          );
          await resetFormFields(LoginInput.value);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
</script>

<style scoped></style>
