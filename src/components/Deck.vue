<template lang="pug">
div.deck
  - for (var i = 0; i < 9; i++) {
    div(class="square" data-value = i)
  - }
</template>

<script>
import {
  checkWinner,
} from '@/hooks/checkWinner';

import {
  onMounted,
  inject,
  watch,
} from 'vue';

export default {
  setup() {
    const WINNER = inject('WINNER');
    const FINISH = inject('FINISH');
    const NOW_PLAYER = inject('NOW_PLAYER');
    const DECK_ARRAY = inject('DECK_ARRAY');
    const PLAYER_STAT = inject('PLAYER_STAT');

    watch(WINNER, (newWinner) => {
      // 若分出勝負，則結束當局遊戲，並顯示結果(Result.vue)
      if (newWinner) {
        FINISH.value = true;

        // 計分。贏家 +1 分，平手各 +1 分。
        if (newWinner === 'player1') {
          PLAYER_STAT.value.player1 += 1;
        } else if (newWinner === 'player2') {
          PLAYER_STAT.value.player2 += 1;
        } else if (newWinner === 'draw') {
          PLAYER_STAT.value.player1 += 1;
          PLAYER_STAT.value.player2 += 1;
        }

        // 將記分板存入 localStorage
        localStorage.setItem('PLAYER_STAT', JSON.stringify(PLAYER_STAT.value));
      }
    });

    onMounted(() => {
      const deck = document.getElementsByClassName('deck')[0];
      const squareList = document.getElementsByClassName('square');

      deck.addEventListener('click', (event) => { // 添加 O 或 Ｘ 時觸發
        if (event.target.classList.contains('square')) {
          const clickPosition = parseInt(event.target.dataset.value, 10) + 1;
          // clickPosition:
          // 1 | 2 | 3
          // 4 | 5 | 6
          // 7 | 8 | 9

          // 將 row 與 column 以 clickPosition 轉換成 0 base 的 index，並應用在更改 DECK_ARRAY 的值。
          const row = Math.ceil(clickPosition / 3) - 1;
          const column = clickPosition % 3 === 0 ? 3 : clickPosition % 3;

          // 若方格內尚未添加除了 square 以外的 class，則可添加 css class (cross, circle) 以及更改 DECK_ARRAY
          if (event.target.classList.length <= 1) {
            if (NOW_PLAYER.value === 'player1') {
              // 操控畫面以及同步 DECK_ARRAY 狀態
              squareList[clickPosition - 1].classList.add('cross');
              DECK_ARRAY.value[row][column - 1] = NOW_PLAYER.value;
              // 交換遊玩者順序
              NOW_PLAYER.value = 'player2';
            } else if (NOW_PLAYER.value === 'player2') {
              squareList[clickPosition - 1].classList.add('circle');
              DECK_ARRAY.value[row][column - 1] = NOW_PLAYER.value;
              NOW_PLAYER.value = 'player1';
            }
          }
        }

        // 每占領一次，檢查一次
        // 尚未分出勝負責 return null
        // 其中一方獲勝則 return 'player1' 或 'player2'
        // 平手則 return 'draw'
        WINNER.value = checkWinner(DECK_ARRAY.value);
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.deck {
  width: 450px;
  height: 450px;
  margin: 30px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  @media (max-width: 640px) {
    width: 300px;
    height: 300px;
  }
  > .square {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:nth-of-type(5){
      border: 8px solid #ED494C;
    }
    &:nth-of-type(2), &:nth-of-type(8){
      border-left: 8px solid #ED494C;
      border-right: 8px solid #ED494C;
    }
    &:nth-of-type(4), &:nth-of-type(6){
      border-top: 8px solid #ED494C;
      border-bottom: 8px solid #ED494C;
    }
  }
}

.circle {
  &::after {
    content: '';
    width: 60px;
    height: 60px;
    border: 8px solid #000;
    border-radius: 50%;
    @media (max-width: 640px) {
      width: 40px;
      height: 40px;
    }
  }
}

.cross {
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 60px;
    top: 50%;
    left: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 60px;
    top: 50%;
    left: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
