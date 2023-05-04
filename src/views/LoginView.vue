<template>
  <div class="container flex">
    <div class="flex">
      <h1 class="blue">Welkom bij de verrassingskalender!</h1>
      <p>U bent 1 van de gelukkige die een kans heeft om een extra prijs te winnen.</p>
      <div class="login">
        <label class="blue">Naam</label>
        <input v-model="UserStore.name" type="text" required placeholder="Vul hier uw naam" />
        <button @click="submit">Ga door</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '../router'
import { useUserStore } from '../stores/userStore'
const UserStore = useUserStore()

function submit() {
  if (UserStore.getName !== '') {
    router.push('/verrassingskalender')
  }
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
  border: solid 2px rgba($color: #fff, $alpha: 0.7);
  background-color: rgba($color: #fff, $alpha: 0.3);
  border-radius: 0.6em;
  padding: 3em;
  margin-top: 2em;

  > * {
    margin: 5px 16px;
  }
}
</style>
