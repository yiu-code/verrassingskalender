export function generateRandomPrizes() {
  const prizes = []
  const set = new Set()

  for (let i = 1; i <= 10000; i++) {
    if (i % 100 === 0) {
      const randomInRange = Math.floor(Math.random() * 100) + i - 100
      prizes.push(randomInRange)
      set.add(randomInRange)
    }
  }

  let jackpot = Math.floor(Math.random() * 10000) + 1
  while (set.has(jackpot)) {
    jackpot = Math.floor(Math.random() * 10000) + 1
  }

  prizes.sort((a, b) => a - b)

  return { prizes, jackpot }
}
