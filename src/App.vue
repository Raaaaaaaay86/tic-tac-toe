<template lang="pug">
EnterPage(v-if="page === 0")
GamePage(v-if="page === 1")
</template>

<script>
import EnterPage from '@/components/EnterPage.vue';
import GamePage from '@/components/GamePage.vue';

import {
  ref,
  provide,
  watchEffect,
  watch,
} from 'vue';

export default {
  name: 'App',
  components: {
    EnterPage,
    GamePage,
  },
  setup() {
    const page = ref(0);
    const winner = ref(null);

    provide('PAGE', page);
    provide('WINNER', winner);

    watchEffect(() => {
      const html = document.getElementsByTagName('html');
      if (page.value === 0) html[0].style.backgroundColor = '#000';
      if (page.value === 1) html[0].style.backgroundColor = '#FF6D70';
    });

    watch(winner, (newValue) => {
      if (newValue) console.log(`${newValue} IS THE WINNER`);
    });

    return {
      page,
    };
  },
};
</script>

<style lang="scss">
html {
  background-color: #000;
}

#app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: 'Roboto Condensed', Arial, Helvetica, sans-serif;
}
.wrapper {
  // width: 100%;
  @media (max-width: 1536px) {
    max-width: 1536px;
  }
  @media (max-width: 1280px) {
    max-width: 1280px;
  }
  @media (max-width: 1024px) {
    max-width: 1024px;
  }
  @media (max-width: 768px) {
    max-width: 768px;
  }
  @media (max-width: 640px) {
    max-width: 640px;
  }
  &-game {
    @extend .wrapper;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    @media (max-width: 640px) {
      justify-content: space-between;
    }
  }
}
</style>
