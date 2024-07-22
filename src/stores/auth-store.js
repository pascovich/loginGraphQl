import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
  state: () => ({
    counter: 0,
    userData: [],
    token: "",
    checkSend: false,
    phoneForgotPwd: "",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    getUserInfo: (state) => state.userData,
    getCheckSend: (state) => state.checkSend,
    getPhoneForgotPwd: (state) => state.phoneForgotPwd,
  },
  actions: {
    increment() {
      this.counter++;
    },
    login(data, token) {
      this.userData = data;
      this.token = token;
    },
    setCheckSend() {
      if (this.checkSend) {
        this.checkSend = false;
      } else {
        this.checkSend = true;
      }
    },
    setPhoneForgotPwd(phone) {
      this.phoneForgotPwd = phone;
    },
  },
  //   persist: true,
});
