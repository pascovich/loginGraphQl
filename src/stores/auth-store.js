import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
  state: () => ({
    counter: 0,
    userData: [],
    token: "",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    getUserInfo: (state) => state.userData,
  },
  actions: {
    increment() {
      this.counter++;
    },
    login(data, token) {
      this.userData = data;
      this.token = token;
    },
  },
  //   persist: true,
});
