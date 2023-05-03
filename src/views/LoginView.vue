<template>
  <div class="container flex">
    <div class="flex">
      <h1>Welkom bij de verrassingskalender!</h1>
      <p>U bent 1 van de gelukkige die een kans heeft om een extra prijs te winnen.</p>
      <div class="login">
        <label>Naam</label>
        <input v-model="UserStore.name" type="text" placeholder="Uw naam hier" />
        <button type="submit" @click="submit">Ga door</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '../router'
import { useUserStore } from '../stores/userStore'
const UserStore = useUserStore()

function submit() {
  router.push('/verrassingskalender')
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}

.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: start;
  border: solid 2px rgba($color: #fff, $alpha: 0.5);
  border-radius: 0.6em;
  padding: 12px;
  margin-top: 12px;

  > * {
    margin: 5px 0;
  }
}
</style>
