// src/store/index.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null,
  }),
  getters: {
    isLogged: (state) => {
      return state.user !== null
    },
  },
  actions: {
    setUser(name) {
      this.user = name
    },
  },
});
