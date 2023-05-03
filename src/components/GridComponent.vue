<script setup>
import { defineAsyncComponent, ref } from 'vue'

const myFavNumber = ref()
const SquareComponent = defineAsyncComponent({
  loader: () => import('./SquareComponent.vue')
})

function scrollToBlock(n) {
  const block = document.querySelector(`.square:nth-child(${n})`)
  if (block) {
    block.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }
}
</script>

<template>
  <div id="container">
    <div id="form">
      <input v-model="myFavNumber" type="number" @change="scrollToBlock(myFavNumber)" />
      <button type="submit" @click="scrollToBlock(myFavNumber)">
        Scroll naar {{ myFavNumber }}
      </button>
    </div>
    <div id="wrapper">
      <div id="grid" ref="grid">
        <SquareComponent
          v-for="i in 10000"
          :key="i"
          class="square"
          @click="scrollToBlock(i)"
          :prize="i"
        ></SquareComponent>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
#container {
  position: block;
}

#wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 65vh;
}

#grid {
  --cols: 100;
  --rows: 100;
  display: grid;
  grid-template-columns: repeat(100, 1fr);
  grid-template-rows: repeat(100, 1fr);
  gap: 0.4em;
  width: 100%;
  overflow: auto;
}

#form {
  display: flex;
  flex-direction: row;
}

#form input {
  border-radius: 0.2em;
}

#form button {
  margin: 5px;
  background-color: #fff;
  border: none;
  border-radius: 0.2em;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
