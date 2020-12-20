<template lang="pug">
div.wrapper-game
  div.scoreBoard
    div.scoreBoard-playerA
    div.scoreBoard-scoreA {{ PLAYER_STAT.player1 }}
    div.scoreBoard-vs vs
    div.scoreBoard-scoreB {{ PLAYER_STAT.player2 }}
    div.scoreBoard-playerB
  Deck(v-if="!FINISH")
  Result(v-if="FINISH")
  div(class="restartBtn" @click="resetGame()") restart
</template>

<script>
import Deck from '@/components/Deck.vue';
import Result from '@/components/Result.vue';
import { inject } from 'vue';

export default {
  components: {
    Result,
    Deck,
  },
  setup() {
    const FINISH = inject('FINISH');
    const DECK_ARRAY = inject('DECK_ARRAY');
    const NOW_PLAYER = inject('NOW_PLAYER');
    const PLAYER_STAT = inject('PLAYER_STAT');

    const resetGame = () => {
      const squares = document.getElementsByClassName('square');

      if (!FINISH.value) {
        // 清除井字上所有樣式(cross, circle.), 並復歸遊戲者順序為 player1
        squares.forEach((square) => {
          square.classList.remove('circle');
          square.classList.remove('cross');
          NOW_PLAYER.value = 'player1';
        });
      } else {
        // Result.vue 出現時 Deck.vue 已被 Destroyed，復歸狀態即可。
        FINISH.value = false;
        NOW_PLAYER.value = 'player1';
      }

      // 復歸九宮格
      DECK_ARRAY.value = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];
    };

    return {
      DECK_ARRAY,
      PLAYER_STAT,
      resetGame,
      FINISH,
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
