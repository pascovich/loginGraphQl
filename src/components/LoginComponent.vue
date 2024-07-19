<template>
  <div class="backPicture">
    <q-card
      class="shadow-6 row bg-white q-mx-xl q-my-xl"
      :class="{ ' body': $q.screen.gt.sm, bodySmall: $q.screen.lt.md }"
    >
      <div
        class="gt-sm col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-12 login-left bg-primary"
      >
        <div class="text-center q-my-xl">
          <div class="text-subtitle2">Hello</div>
          <div class="text-h6">Welcome</div>
        </div>
        <div class="text-center q-my-xl">
          <q-avatar color="white">
            <img :src="logoRenova" width="100px" alt="imd" srcset="" />
          </q-avatar>
        </div>
        <div class="text-center q-mx-md q-mb-xs">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            numquam, harum illum commodi aliquam nostrum distinctio dolorem.
            Culpa perferendis impedit vel nobis, suscipit sequi alias incidunt
            voluptates blanditiis, nisi accusamus.
          </p>
          <br /><br />
          <p class="text-secondary q-mb-xl text-bold">Making Business better</p>
        </div>
      </div>
      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12 bg-white">
        <div class="text-center">
          <div class="text-h6 q-mt-lg gt-sm text-bold">SIGN - IN</div>
          <q-separator
            color="primary"
            class="gt-sm"
            style="
              height: 3px;
              width: 20%;
              margin-left: auto;
              margin-right: auto;
            "
            inset
          />
          <div
            style="border-radius: 0px 0px 50px 50px"
            class="bg-primary lt-md q-pt-md"
          >
            <div class="text-subtitle2 text-secondary">
              <q-avatar color="white">
                <img :src="logoRenova" width="100px" alt="imd" srcset="" />
              </q-avatar>
            </div>
            <br />
            <div class="text-h6 text-bold">SIGN - IN</div>
            <q-separator
              color="secondary"
              style="
                height: 3px;
                width: 25%;
                margin-left: auto;
                margin-right: auto;
              "
              inset
            />
            <br />
          </div>

          <br />

          <div :class="{ 'bg-white inputBlock': $q.screen.gt.sm }">
            <br />
            <div class="q-px-xl">
              <q-form @submit.prevent="onSubmit">
                <q-input
                  rounded
                  outlined
                  dense
                  v-model="LoginInput.phone"
                  label="The phone number"
                >
                  <template v-slot:prepend>
                    <q-icon name="create" />
                  </template>
                </q-input>
                <br />
                <q-input
                  rounded
                  outlined
                  bottom-slots
                  v-model="LoginInput.password"
                  label="The Password"
                  dense
                  :type="inputType"
                >
                  <!-- :rules="[(val) => !!val || '* Required']" -->
                  <template v-slot:prepend>
                    <q-icon name="key" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="
                        inputType === 'password'
                          ? 'visibility_off'
                          : 'visibility'
                      "
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </template>
                </q-input>
                <p class="float-right">
                  Forgot password? click
                  <span>
                    <router-link
                      to="Forgot-Password"
                      style="text-decoration: none"
                      class="text-secondary text-bold"
                    >
                      here
                    </router-link>
                  </span>
                </p>
                <br /><br />
                <div
                  class="flex flex-center"
                  style="marign-left: auto; margin-right: auto"
                >
                  <q-btn
                    unelevated
                    tooltip="Sign up"
                    type="submit"
                    rounded
                    color="primary"
                    class="text-center"
                    style="width: 150px"
                    icon="cloud_download"
                    label="   continue"
                    :loading="loading"
                  />
                </div>
              </q-form>
              <br />
              OR
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
              Haven't an account?
              <span>
                <router-link
                  to="SIgnUp"
                  style="text-decoration: none"
                  class="text-secondary text-bold"
                >
                  Sign Up
                </router-link>
              </span>
              <br />
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import AuthInfoComponent from "./shared/LeftAuthComponent.vue";
import { logo, logoRenova, api } from "../../app/variables.js";
import axios from "axios";
import { LoginQuery } from "../../app/query/LoginQuery";
import { authStore } from "../stores/auth-store.js";
import {
  resetFormFields,
  hasEmptyField,
  notificationFonction,
} from "../../app/utils/index";

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

// function
function togglePasswordVisibility(inputType) {
  inputType.value = inputType.value === "password" ? "text" : "password";
}

const onSubmit = async () => {
  if (hasEmptyField(LoginInput.value)) {
    notificationFonction(
      "Data are empty",
      "negative",
      "negative",
      "bottom",
      "error"
    );
    return;
  } else {
    loading.value = true;
    const query = await LoginQuery(
      LoginInput.value.phone,
      LoginInput.value.password
    );
    await axios
      .post(`${api}/graphql`, { query })
      .then(async (res) => {
        if (res.data.errors.length > 0) {
          //   console.log(res.data.errors[0].message);
          await notificationFonction(
            res.data.errors[0].message,
            "negative",
            "negative",
            "bottom-right",
            "error"
          );
          await resetFormFields(LoginInput.value);
        } else {
          await store.login(res, res.token);

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

<style scoped>
.body {
  max-width: 65%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
}
.bodySmall {
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
}
.inputBlock {
  margin-left: -13px;
  border-radius: 20px;
}
</style>
