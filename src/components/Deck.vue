<template lang="pug">
div.deck
  - for (var i = 0; i < 9; i++) {
    div(class="square" data-value = i)
  - }
</template>

<script>
import {
  makeColumns,
  makeDiagonals,
  checkRows,
  checkColumns,
  checkDiagonal,
} from '@/hooks/checkWinner';
import {
  ref,
  onMounted,
  reactive,
  inject,
} from 'vue';

export default {
  setup() {
    const WINNER = inject('WINNER');
    const nowPlayer = ref('player1');
    const deckArray = reactive([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);

    const checkWinner = () => {
      const columnList = [[], [], []];
      const diagonalList = [[], []];
      let winner = null;

      makeColumns(deckArray, columnList);
      makeDiagonals(deckArray, diagonalList);

      const checkTasks = [
        checkDiagonal(diagonalList),
        checkColumns(columnList),
        checkRows(deckArray),
      ];

      checkTasks.forEach((result) => {
        if (result) winner = result;
      });

      return winner;
    };

    onMounted(() => {
      const deck = document.getElementsByClassName('deck')[0];
      const squareList = document.getElementsByClassName('square');

      deck.addEventListener('click', (event) => {
        if (event.target.classList.contains('square')) {
          const clickPosition = parseInt(event.target.dataset.value, 10) + 1;

          const row = Math.ceil(clickPosition / 3) - 1;
          const column = clickPosition % 3 === 0 ? 3 : clickPosition % 3;

          if (event.target.classList.length <= 1) {
            if (nowPlayer.value === 'player1') squareList[clickPosition - 1].classList.add('cross');
            if (nowPlayer.value === 'player2') squareList[clickPosition - 1].classList.add('circle');
            deckArray[row][column - 1] = nowPlayer.value;
          }
        }

        if (nowPlayer.value === 'player1') {
          nowPlayer.value = 'player2';
        } else {
          nowPlayer.value = 'player1';
        }

        WINNER.value = checkWinner();
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
