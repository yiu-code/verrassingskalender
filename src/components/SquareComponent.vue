<script setup>
import { usePrizeStore } from '../stores/prizeStore'
import { useUserStore } from '../stores/userStore'

import questionSign from '@/assets/question-sign.jpg'
import prize0 from '@/assets/prize0.jpg'
import prize1 from '@/assets/prize1.jpg'
import prize2 from '@/assets/prize2.jpg'

import { ref, onMounted, computed } from 'vue'
const PrizeStore = usePrizeStore()
const UserStore = useUserStore()
const props = defineProps({
  prize: Number
})

let agreement = false
const canvas = ref(null)
const ctx = ref(null)
const canvas2 = ref(null)
const ctx2 = ref(null)
const isDown = ref(false)
const radius = 12
const pi2 = Math.PI * 2

const img = new Image()
const img2 = new Image()

const chosenNumber = computed(() => {
  return UserStore.getChosenNumber
})

function alertUser(index) {
  if (agreement !== true && UserStore.getAttempt !== 0) {
    if (
      window.confirm(
        `U heeft voor nummer ${index} gekozen. Als u begint met krassen van een nummer kunt u niet meer van nummer veranderen? Weet u zeker dat u deze nummer wilt krassen?`
      )
    ) {
      agreement = true
      UserStore.addChosenNumer(index)
    }
  }
}

img.onload = start
img2.onload = start2
function start() {
  if (!PrizeStore.scratched.includes(props.prize)) {
    ctx.value.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
    ctx.value.globalCompositeOperation = 'destination-out'
    canvas.value.addEventListener('mousedown', handleMouseDown)
    canvas.value.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }
}

function start2() {
  if (PrizeStore.scratched.includes(props.prize)) {
    ctx2.value.drawImage(img2, 0, 0, canvas2.value.width, canvas2.value.height)
  }
}

function handleMouseDown(e) {
  if (agreement === true && UserStore.getChosenNumber == props.prize) {
    isDown.value = true
    const pos = getXY(e)
    erase(pos.x, pos.y)
  }
}

function handleMouseUp() {
  isDown.value = false
}
function handleMouseMove(e) {
  if (!isDown.value) return
  const pos = getXY(e)
  erase(pos.x, pos.y)
}

function getXY(e) {
  const rect = canvas.value.getBoundingClientRect()
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}
function erase(x, y) {
  ctx.value.beginPath()
  ctx.value.arc(x, y, radius, 0, pi2)
  ctx.value.fill()
  PrizeStore.addScratched(props.prize)
  UserStore.calculateAttempt()
  ctx2.value.drawImage(img2, 0, 0, canvas2.value.width, canvas2.value.height)
}

function prizeImageIndex(num) {
  if (PrizeStore.prizes.includes(num)) {
    return prize1
  } else if (PrizeStore.jackpot === num) {
    return prize2
  } else {
    return prize0
  }
}

onMounted(() => {
  ctx2.value = canvas2.value.getContext('2d')
  ctx.value = canvas.value.getContext('2d')
  img.src = questionSign
  img2.src = prizeImageIndex(props.prize)
})
</script>

<template>
  <div class="container">
    <div class="wrapper" @click="alertUser(props.prize)">
      <canvas
        id="background"
        ref="canvas2"
        width="75"
        height="75"
        :class="{
          'red-border': PrizeStore.scratched.includes(props.prize)
        }"
      ></canvas>
      <canvas id="canvas" ref="canvas" width="75" height="75"></canvas>
    </div>
    {{ props.prize }}
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin: 4px;

  .wrapper {
    position: relative;
    width: 75px;
    aspect-ratio: 1/1;
    border-radius: 50%;

    #background {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
    }

    #canvas {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
    }
  }
}

.red-border {
  border: solid red 3px;
}
</style>
