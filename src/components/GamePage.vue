<template lang="pug">
div.wrapper-game
  div.scoreBoard
    div.scoreBoard-playerA
    div.scoreBoard-scoreA 10
    div.scoreBoard-vs vs
    div.scoreBoard-scoreB 8
    div.scoreBoard-playerB
  Deck(v-if="!finish")
  Result(v-if="finish")
  div(class="restartBtn") restart
</template>

<script>
import Deck from '@/components/Deck.vue';
import Result from '@/components/Result.vue';
import { ref } from 'vue';

export default {
  components: {
    Result,
    Deck,
  },
  setup() {
    const finish = ref(false);

    return {
      finish,
    };
  },
};
</script>

<style lang="scss" scoped>
.scoreBoard {
  display: flex;
  user-select: none;
}

.scoreBoard-score {
  background-color: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: 800;
  border-top: 4px solid #000;
  border-bottom: 4px solid #000;
  width: 180px;
  @media (max-width: 640px) {
    width: 60px;
  }
  &A {
    @extend .scoreBoard-score;
  }
  &B {
    @extend .scoreBoard-score;
  }
}

.scoreBoard-player {
  width: 64px;
  height: 64px;
  border: 4px solid #000;
  position: relative;
  &A {
    @extend .scoreBoard-player;
    background-color: #ED494C;
    border-radius: 8px 0 0 8px;
    &::after {
      content: '';
      position: absolute;
      width: 5px;
      height: 70%;
      top: 50%;
      left: 50%;
      background-color: #fff;
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &::before {
      content: '';
      position: absolute;
      width: 5px;
      height: 70%;
      top: 50%;
      left: 50%;
      background-color: #fff;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
  &B {
    @extend .scoreBoard-player;
    background-color: #000;
    border-radius: 0 8px 8px 0;
    &::after {
      content: '';
      position: absolute;
      width: 50%;
      height: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 4px solid white;
      border-radius: 50%;
    }
  }
}

.scoreBoard-vs {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
  width: 70px;
  background-color: #000;
  font-weight: 800;
  font-size: 20px;
  border-radius: 8px 8px 0 0;
}

.restartBtn {
  background-color: #ED494C;
  padding: 18px 0;
  width: 100%;
  font-size: 48px;
  text-align: center;
  border-radius: 8px;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
  @media (max-width: 640px) {
    width: 80%;
  }
}
</style>
