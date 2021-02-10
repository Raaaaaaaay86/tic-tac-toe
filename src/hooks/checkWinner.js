const makeColumns = (deck) => {
  const columnList = [[], [], []];

  for (let i = 0; i < deck.length; i += 1) {
    for (let j = 0; j < deck[i].length; j += 1) {
      columnList[i].push(deck[j][i]);
    }
  }

  return columnList;
};

const makeDiagonals = (deck) => {
  const diagonalList = [[], []];

  for (let indexForDiagonalList = 0; indexForDiagonalList < 2; indexForDiagonalList += 1) {
    let indexForLeftToRightDiagonal = 0;
    let indexForRightToLeftDiagonal = 2;

    for (let deckRowIndex = 0; deckRowIndex < deck.length; deckRowIndex += 1) {
      if (indexForDiagonalList === 0) {
        diagonalList[indexForDiagonalList].push(deck[deckRowIndex][indexForLeftToRightDiagonal]);
        indexForLeftToRightDiagonal += 1;
      } else {
        diagonalList[indexForDiagonalList].push(deck[deckRowIndex][indexForRightToLeftDiagonal]);
        indexForRightToLeftDiagonal -= 1;
      }
    }
  }

  return diagonalList;
};

const checkParsedArray = (parsedArray) => {
  let winner = null;
  parsedArray.forEach((element) => {
    if (element.every((value) => value === 'player1')) winner = 'player1';
    if (element.every((value) => value === 'player2')) winner = 'player2';
  });
  return winner;
};

const checkDraw = (deck) => {
  let occupied = 0;

  deck.forEach((row) => {
    row.forEach((col) => {
      if (col) occupied += 1;
    });
  });

  return occupied === 9 ? 'draw' : null;
};

const checkWinner = (deck) => {
  let winner = null;

  const checkTasks = [
    checkParsedArray(makeColumns(deck)),
    checkParsedArray(makeDiagonals(deck)),
    checkParsedArray(deck),
    checkDraw(deck),
  ];

  // 若 checkTasks 其中一個條件產生贏家或平手，則 winner 為 return 的值，否則 winner = null。

  for (let i = 0; i < checkTasks.length; i += 1) {
    const result = checkTasks[i];
    if (result) {
      winner = result;
      break; // 贏家產生則不再檢查
    }
  }

  return winner;
};

export {
  makeColumns,
  makeDiagonals,
  checkParsedArray,
  checkDraw,
  checkWinner,
};
