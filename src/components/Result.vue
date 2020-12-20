<template lang="pug">
div(class="winner" id="showWinner" v-if="WINNER === 'player1' || WINNER === 'player2'")
  h1 winner!
div(class="draw-circle" v-if="WINNER === 'draw'")
  - for (let i = 0; i < 3; i++)
    h1 draw!
  div.draw-cross
</template>

<script>
import { inject, onMounted } from 'vue';

export default {
  setup() {
    const WINNER = inject('WINNER');

    onMounted(() => {
      // 操控 .winner classList 來顯示正確贏家。
      const showWinner = document.getElementById('showWinner');
      if (WINNER.value === 'player1') showWinner.classList.add('player1');
      if (WINNER.value === 'player2') showWinner.classList.add('player2');
    });

    return {
      WINNER,
    };
  },
};
</script>

<style lang="scss" scoped>
.winner {
  margin: auto 0;
  font-size: 154px;
  font-weight: 800;
  text-transform: uppercase;
  color: #FF6D70;
  font-style: italic;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: white;
  @media (max-width: 640px) {
    font-size: 80px;
  }
  &.player1 {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 32px;
      height: 400px;
      top: 50%;
      left: 50%;
      background-color: #ED494C;
      transform: translate(-50%, -50%) rotate(45deg);
      z-index: -1;
    }
    &::before {
      content: '';
      position: absolute;
      width: 32px;
      height: 400px;
      top: 50%;
      left: 50%;
      background-color: #ED494C;
      transform: translate(-50%, -50%) rotate(-45deg);
      z-index: -1;
    }
  }
  &.player2 {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300px;
      height: 300px;
      border: 32px solid #ED494C;
      border-radius: 50%;
      z-index: -1;
      transform: translate(-50%, -50%);
      @media (max-width: 768px) {
        width: 230px;
        height: 230px;
      }
    }
  }
}

.draw {
  &-circle {
    position: relative;
    margin: auto 0;
    font-size: 154px;
    font-weight: 800;
    color: #FF6D70;
    font-style: italic;
    text-transform: uppercase;
    user-select: none;
    -webkit-text-stroke-width: 4px;
    -webkit-text-stroke-color: white;
    @media (max-width: 768px) {
      font-size: 80px;
    }
    &::after {
      content: '';
      position: absolute;
      width: 150px;
      height: 150px;
      top: 50%;
      right: 25%;
      border-radius: 50%;
      border: 32px solid #ED494C;
      transform: translate(75%, -50%);
      z-index: -1;
      @media (max-width: 640px) {
        width: 80px;
        height: 80px;
        right: 30%;
      }
    }
  }
  &-cross {
    &::after {
      content: '';
      position: absolute;
      width: 32px;
      height: 230px;
      top: 50%;
      left: 10%;
      background-color: #ED494C;
      transform: translate(0%, -50%) rotate(45deg);
      z-index: -1;
      @media (max-width: 640px) {
        height: 180px;
        left: 6%;
      }
    }
    &::before {
      content: '';
      position: absolute;
      width: 32px;
      height: 230px;
      top: 50%;
      left: 10%;
      background-color: #ED494C;
      transform: translate(0%, -50%) rotate(-45deg);
      z-index: -1;
      @media (max-width: 640px) {
        height: 180px;
        left: 6%;
      }
    }
  }
}
</style>
