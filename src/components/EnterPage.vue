<template lang="pug">
div.wrapper
  div.chart
    div tic
    div
      div.circle
    div
      div.cross
        div.cross-center
    div
      div.cross--fill
    div tac
    div
      div.circle--outlined
    div
      div.circle--outlined
    div
      div.cross--fill
    div toe
  div(class="startBtn" @click="startGame") start
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const PAGE = inject('PAGE');

    // 跳轉頁面
    const startGame = () => {
      PAGE.value = 1;
    };

    return {
      startGame,
    };
  },
};
</script>

<style lang="scss" scoped>
.chart {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  row-gap: 60px;
  font-weight: 800;
  font-size: 100px;
  font-style: italic;
  text-align: center;
  text-transform: uppercase;
  @media (max-width: 768px) {
    column-gap: 5px;
    row-gap: 15px;
    font-size: 60px;
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 8px solid #FF6D70;
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
  &--outlined {
    @extend .circle;
    border: 4px solid #FF6D70;
    position: relative;
    &::after {
      content: '';
      width: 50px;
      height: 50px;
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      border: 4px solid #FF6D70;
      transform: translate(-50%, -50%);
      @media (max-width: 768px) {
        width: 25px;
        height: 25px;
      }
    }
  }
}

.cross{
  width: 100px;
  height: 100px;
  position: relative;
  &::after, &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 100px;
    border: 4px solid white;
    background-color: #000;
    transform: translate(-50%, -50%) rotate(45deg);
    @media (max-width: 768px) {
      height: 50px;
    }
  }
  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &--fill {
    @extend .cross;
    &::after, &::before {
      border-color: #FF6D70;
      background-color: #FF6D70;
    }
  }
}

.cross-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11px;
  height: 1.8px;
  border: 4px solid #000;
  background-color: #000;
  z-index: 100;
  box-sizing: content-box;
  transform: translate(-50%, -50%) rotate(45deg);
}

.startBtn {
  margin: 40px auto;
  padding: 18px 0;
  background-color: #fff;
  color: #FF6D70;
  font-size: 48px;
  text-align: center;
  border-radius: 8px;
  text-transform: uppercase;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 80%;
  }
}
</style>
