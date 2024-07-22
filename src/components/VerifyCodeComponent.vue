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
            <div class="text-h6 q-mt-xl gt-sm text-bold">
              {{ $t("titleVerifyCode") }}
            </div>

            <q-separator color="primary" class="gt-sm separator" inset />
            <br />
            <div class="text-subtitle2 gt-sm">
              {{ $t("subtitleDescverifyCode") }} :
              <span class="text-primary text-bold">{{
                store.getPhoneForgotPwd
              }}</span>
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
                {{ $t("titleVerifyCode") }}
              </div>
              <q-separator color="secondary " class="separatorLessThan" inset />
              <br />
              <div class="text-subtitle2 text-white lt-md">
                {{ $t("subtitleDescverifyCode") }}
                <span class="text-primary text-bold">{{
                  store.getPhoneForgotPwd
                }}</span>
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
                  <div class="opt-field">
                    <input type="text" v-model="nbr.num1" maxlength="1" />
                    <input type="text" v-model="nbr.num2" maxlength="1" />
                    <input
                      class="space"
                      v-model="nbr.num3"
                      type="text"
                      maxlength="1"
                    />
                    <input type="text" v-model="nbr.num4" maxlength="1" />
                    <input type="text" v-model="nbr.num5" maxlength="1" />
                    <input type="text" v-model="nbr.num6" maxlength="1" />
                  </div>
                  <br />
                  <div class="float-right" id="time" v-if="!timeOut">
                    {{ counter }}
                  </div>
                  <p class="float-right" v-else>
                    {{ $t("haventsms") }}

                    <span
                      @click="resendCode"
                      class="text-secondary text-bold btn"
                    >
                      {{ $t("resendLinkLabel") }}
                    </span>
                  </p>

                  <br /><br />
                  <div
                    class="flex flex-center justify-espace-between centerDiv"
                  >
                    <q-btn
                      unelevated
                      @click="exitToForgot"
                      :tooltip="$t('dismissBtn')"
                      rounded
                      color="red"
                      class="text-white"
                      style="width: 180px"
                      icon="logout"
                      :label="$t('dismissBtn')"
                    />
                    <q-btn
                      unelevated
                      :tooltip="$t('loginBtn')"
                      type="submit"
                      rounded
                      color="primary"
                      class="text-center q-ml-sm"
                      style="width: 180px"
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
import { ref, computed, onMounted } from "vue";
import AuthInfoComponent from "./shared/LeftAuthComponent.vue";
import { authStore } from "../stores/auth-store.js";
import { logo, logoRenova, api } from "../../app/variables.js";
import axios from "axios";
import {
  ForgotPasswordVerifyCodeQuery,
  ForgotPasswordQuery,
} from "../../app/query/LoginQuery";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import {
  resetFormFields,
  hasEmptyField,
  notificationFonction,
  insertQuery,
} from "../../app/utils/index";

const { t } = useI18n();
const router = useRouter();
const PhoneAndToken = ref({
  phone: "",
  verificationToken: "",
});
const nbr = ref({
  num1: "",
  num2: "",
  num3: "",
  num4: "",
  num5: "",
  num6: "",
});

const counter = ref("");
const store = authStore();

const loading = ref(false);
const timeOut = ref(false);
const startCountdown = (timeleft) => {
  var downloadTimer = setInterval(function () {
    timeleft--;
    counter.value = timeleft + ` ${t("counterTimeRest")}`;
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      timeOut.value = true;
    }
  }, 1000);
};

onMounted(() => {
  startCountdown(60);
});

const onSubmit = async () => {
  loading.value = true;
  PhoneAndToken.value.verificationToken = nbr.value.num1.concat(
    nbr.value.num2,
    nbr.value.num3,
    nbr.value.num4,
    nbr.value.num5,
    nbr.value.num6
  );
  PhoneAndToken.value.phone = store.getPhoneForgotPwd;
  if (hasEmptyField(PhoneAndToken.value)) {
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
    const query = await ForgotPasswordVerifyCodeQuery(
      PhoneAndToken.value.phone,
      PhoneAndToken.value.verificationToken
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
          // await store.login(res, res.token);

          await notificationFonction(
            res.data.message,
            "positive",
            "primary",
            "bottom-right",
            "check"
          );
          store.setCheckSend();
          router.push("/login");
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
const exitToForgot = async () => {
  startCountdown(0);
  store.setCheckSend();
};

const resendCode = async () => {
  // const query = await ForgotPasswordQuery(store.getPhoneForgotPwd);
  await notificationFonction(
    "res.data.message,",
    "positive",
    "primary",
    "bottom-right",
    "check"
  );

  try {
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
          await notificationFonction(
            res.data.message,
            "positive",
            "primary",
            "bottom-right",
            "check"
          );

          counter.value = "";
          timeOut.value = false;
          startCountdown(60);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading.value = false;
      });
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped></style>
