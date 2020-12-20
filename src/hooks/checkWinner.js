const makeColumns = (deck, columnList) => {
  for (let i = 0; i < deck.length; i += 1) {
    for (let j = 0; j < deck[i].length; j += 1) {
      columnList[i].push(deck[j][i]);
    }
  }
};

const makeDiagonals = (deck, diagonalList) => {
  for (let i = 0; i < 2; i += 1) {
    let k = 0;
    let q = 2;

    for (let j = 0; j < deck.length; j += 1) {
      if (i === 1) {
        diagonalList[i].push(deck[j][q]);
        q -= 1;
      } else {
        diagonalList[i].push(deck[j][k]);
        k += 1;
      }
    }
  }
};

const checkColumns = (columnList) => {
  let winner = null;
  columnList.forEach((column) => {
    if (column.every((value) => value === 'player1')) winner = 'player1';
    if (column.every((value) => value === 'player2')) winner = 'player2';
  });
  return winner;
};

const checkRows = (deck) => {
  let winner = null;
  deck.forEach((row) => {
    if (row.every((value) => value === 'player1')) winner = 'player1';
    if (row.every((value) => value === 'player2')) winner = 'player2';
  });
  return winner;
};

const checkDiagonal = (diagonalList) => {
  let winner = null;
  diagonalList.forEach((diagonal) => {
    if (diagonal.every((value) => value === 'player1')) winner = 'player1';
    if (diagonal.every((value) => value === 'player2')) winner = 'player2';
  });
  return winner;
};

const checkDraw = (deck) => {
  let occupied = 0;

  deck.value.forEach((row) => {
    row.forEach((col) => {
      if (col) occupied += 1;
    });
  });

  return occupied === 9 ? 'draw' : null;
};

export {
  makeColumns,
  makeDiagonals,
  checkRows,
  checkColumns,
  checkDiagonal,
  checkDraw,
};
