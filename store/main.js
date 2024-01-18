// src/store/index.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
  }),
  getters: {
    isLogged: (state) => state.user,
  },
  actions: {
    setUser(name) {
      this.user = name
    },
  },
});
