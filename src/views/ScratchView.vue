<script setup>
import { defineAsyncComponent } from 'vue'
import { useUserStore } from '../stores/userStore'
const UserStore = useUserStore()
const GridComponent = defineAsyncComponent({
  loader: () => import('../components/GridComponent.vue')
})
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <h1 class="blue">
        Welkom <span>{{ UserStore.getName }}</span
        >, bij de verrassingskalender!
      </h1>
      <p>
        U mag nog <span>{{ UserStore.getAttempt }}</span> nummer kiezen om te krassen en wie weet
        wint u!
      </p>
      <p>
        De Nummer die u heeft gekozen is: <span>{{ UserStore.getChosenNumber || '' }}</span>
      </p>
      <p class="disclaimer">
        LET OP: een cirkel met een rode rand is al gekrast door een andere kandidaat.
      </p>
      <p>
        Geen zin om te scrollen? Of heb je al een nummer in gedachten? Vul hieronder jou nummer in!
      </p>
    </div>
    <GridComponent />
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 3em 0;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }

  .disclaimer {
    margin: 12px 0;
    font-weight: 700;
  }
}
</style>
