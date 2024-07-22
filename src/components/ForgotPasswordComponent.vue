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
          <div class="text-center" v-if="ifSendCode">
            <VerifyCodeComponent />
          </div>
          <div v-else class="text-center">
            <div class="text-h6 q-mt-xl gt-sm text-bold">
              {{ $t("title") }}
            </div>

            <q-separator color="primary" class="gt-sm separator" inset />
            <br />
            <div class="text-subtitle2 gt-sm">
              {{ $t("subtitleDesc") }}
            </div>
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
              <div class="text-subtitle2 text-white lt-md">
                {{ $t("subtitleDesc") }}
              </div>
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
                    v-model="PhoneInput.phone"
                    :label="$t('phoneInput')"
                    :rules="[
                      (val) =>
                        (val && val.length > 9) ||
                        'phone number must be great than 9 characters',
                    ]"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AuthInfoComponent from "./shared/LeftAuthComponent.vue";
import VerifyCodeComponent from "./VerifyCodeComponent.vue";

import { logo, logoRenova, api } from "../../app/variables.js";
import axios from "axios";
import { ForgotPasswordQuery } from "../../app/query/LoginQuery";
import { authStore } from "../stores/auth-store.js";
import { useI18n } from "vue-i18n";

import {
  resetFormFields,
  hasEmptyField,
  notificationFonction,
  insertQuery,
} from "../../app/utils/index";
import { useRouter } from "vue-router";

const { t } = useI18n();
const PhoneInput = ref({
  phone: "",
});

const loading = ref(false);
// const checkSend = ref(false);

const store = authStore();
const router = useRouter();

const ifSendCode = computed(() => {
  return store.getCheckSend;
});

const onSubmit = async () => {
  if (hasEmptyField(PhoneInput.value)) {
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
    const query = await ForgotPasswordQuery(PhoneInput.value.phone);
    setTimeout(() => {
      store.setCheckSend();
      store.setPhoneForgotPwd(PhoneInput.value.phone);
      // checkSend.value = true;
      loading.value = false;
    }, 1000);

    // await insertQuery(`${api}/graphql`, { query })
    //   .then(async (res) => {
    //     if (res.data.errors.length > 0) {
    //       await notificationFonction(
    //         res.data.errors[0].message,
    //         "negative",
    //         "negative",
    //         "top-right",
    //         "error"
    //       );
    //     } else {
    //       // await store.login(res, res.token);

    //       await notificationFonction(
    //         res.data.message,
    //         "positive",
    //         "primary",
    //         "bottom-right",
    //         "check"
    //       );
    //       checkSend.value = true;
    //       // await resetFormFields(PhoneInput.value);
    //       // await router.push("/Reset-Password");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     loading.value = false;
    //   });
  }
};
</script>

<style scoped></style>
