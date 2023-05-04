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
    <form>
      <input
        placeholder="Nummer in gedachten?"
        v-model="myFavNumber"
        type="number"
        @change="scrollToBlock(myFavNumber)"
      />
      <button type="submit" @click="scrollToBlock(myFavNumber)">
        Scroll naar {{ myFavNumber }}
      </button>
    </form>
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

<style lang="scss" scoped>
#container {
  position: block;

  form {
    display: flex;
    flex-direction: row;

    input {
      width: 168px;
    }

    button {
      margin-left: 8px;
    }
  }

  #wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 65vh;

    #grid {
      display: grid;
      grid-template-columns: repeat(100, 1fr);
      grid-template-rows: repeat(100, 1fr);
      gap: 8px;
      width: 100%;
      overflow: auto;
    }
  }
}
</style>
