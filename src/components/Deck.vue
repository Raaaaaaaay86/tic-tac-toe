<template lang="pug">
div.deck
  - for (var i = 0; i < 9; i++) {
    div.square.cross
  - }
</template>

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
    box-sizing: content-box;
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
