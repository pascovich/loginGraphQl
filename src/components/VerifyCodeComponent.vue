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
              {{ $t("subtitleDescverifyCode") }}
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
                {{ $t("titleVerifyCode") }} vvv
              </div>
              <q-separator color="secondary " class="separatorLessThan" inset />
              <br />
              <div class="text-subtitle2 text-white lt-md">
                {{ $t("subtitleDescverifyCode") }}
              </div>
              {{ store.getPhoneForgotPwd }}
              {{ ifSendCode }}cccc
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
                  <p class="float-right">
                    {{ $t("haventsms") }}
                    <span
                      @click="resendCode"
                      class="text-secondary text-bold btn"
                    >
                      {{ $t("resendLinkLabel") }}
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
import { authStore } from "../stores/auth-store.js";
import { logo, logoRenova, api } from "../../app/variables.js";
import axios from "axios";
import { ForgotPasswordVerifyCodeQuery } from "../../app/query/LoginQuery";
import { useI18n } from "vue-i18n";

import {
  resetFormFields,
  hasEmptyField,
  notificationFonction,
  insertQuery,
} from "../../app/utils/index";

const { t } = useI18n();
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

const store = authStore();
const ifSendCode = computed(() => {
  return store.getCheckSend;
});

const loading = ref(false);

const onSubmit = async () => {
  PhoneAndToken.value.phone = num1.concat(num2, num3, num4, num5, num6);
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
