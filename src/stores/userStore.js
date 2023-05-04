import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', {
  state: () => ({
    name: null,
    attempt: 1,
    chosenNumber: null
  }),
  getters: {
    getName(state) {
      return state.name
    },
    getAttempt(state) {
      return state.attempt
    },
    getChosenNumber(state) {
      return state.chosenNumber
    }
  },
  actions: {
    calculateAttempt() {
      if (this.attempt > 0) {
        this.attempt--
      }
    },
    addChosenNumer(num) {
      this.chosenNumber = num
    },
    addName(name) {
      this.name = name
    }
  }
})
