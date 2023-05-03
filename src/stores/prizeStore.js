import { defineStore } from 'pinia'
import { generateRandomPrizes } from '../services/GeneratePrize'

export const usePrizeStore = defineStore('Prizes', {
  state: () => ({
    prizes: [],
    jackpot: null,
    scratched: []
  }),
  getters: {
    getPrizes(state) {
      return state.prizes
    },
    getJackpot(state) {
      return state.jackpot
    },
    getScratched(state) {
      return state.scratched
    }
  },
  actions: {
    async setUpPrizes() {
      if (this.prizes.length === 0 && this.jackpot === null) {
        let res = generateRandomPrizes()
        this.prizes = res.prizes
        this.jackpot = res.jackpot
      }
    },
    addScratched(num) {
      if (!this.scratched.includes(num)) {
        this.scratched.push(num)
      }
    }
  },
  persist: {
    storage: localStorage
  }
})
