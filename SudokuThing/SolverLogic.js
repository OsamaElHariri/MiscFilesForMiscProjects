var board = [ [ 0,0,0,0,5,0,0,7,4 ],
    [ 8,0,1,0,0,0,0,0,0 ],
    [ 0,0,0,0,0,0,0,0,0 ],
    [ 0,7,0,2,4,0,0,0,0],
    [ 6,0,0,0,0,0,1,0,0 ],
    [ 0,0,0,0,0,0,0,0,0 ],
    [ 2,0,0,1,0,6,3,0,0 ],
    [ 0,4,0,0,0,0,0,2,0 ],
    [ 0,0,0,8,0,0,0,0,0] ];


// Loops through a colomn, if the number 'n' is in the column, return false. Else, return true
function validColumn(boardSt, n, column){
    for( var i = 0; i < 9; i++){
        if(boardSt[i][column] === n){
            return false;
        }
    }
    // The number 'n' is not in the column, so return true
    return true;
}


// Loops through a row, if the number 'n' is in the row, return false. Else, return true
function validRow(boardSt, n, row){
    for( var i = 0; i < 9; i++){
        if(boardSt[row][i] === n){
            return false;
        }
    }
    // The number 'n' is not in the row, so return true
    return true;
}


// checks the 3x3 square, if the number 'n' is in the square, return false. Else, return true
function validSquare(boardSt, n, row, colomn){
    // The rows and colomns are numbered 0 to 8. If they are devided by 3 and the lower bound is
    // is taken, and then they are multiplied by 3, the coordinates of the upper left corner are obtained.
    var startingSquareRow = Math.floor(row/3) * 3;
    var startingSquareColomn = Math.floor(colomn/3) * 3;

    // The square to be checked is the 3x3 square that contains the starting square
    for(var i = startingSquareRow; i < startingSquareRow + 3; i++){
        for(var j = startingSquareColomn; j < startingSquareColomn + 3; j++){
            if(boardSt[i][j] === n){
                return false;
            }
        }
    }
    // The number 'n' is not in the 3x3 square, so return true
    return true;
}


// Checks if the row, colomn, and square are valid for a number 'n'
function superValid(boardSt, n, row, colomn){
    if(validColumn(boardSt, n, colomn) && validRow(boardSt, n, row) && validSquare(boardSt, n, row, colomn)){
        return true;
    }
    // Otherwise, one of them is false, so return false
    return false;
}


// Initializer for a 2D array that will contain 'occupants' objects, representing the current board state, as well as the candidates for the unsolved squares
// Return a 2D array. The board parameter is a 2D array that maps to the sudoku board, with 0s representing blank spaces
function initializeOccupants(board) {
    var filledBoard = [] // 2D array, will be filled with 'occupants' objects

    for(var i = 0; i < 9; i++){
        var temp = [];
        for(var j = 0; j < 9; j++){
            // Occupants: If the coords contain a given/solved value, solved = correct value, otherwise, solved = 0, and the candidates are in the form of a string
            var tempOccupant = {solved: 0, candidates: "123456789"};

            // If the square contains a clue, mark 'occupants.solved' as the value of that clue
            if(board[i][j] !== 0){
                tempOccupant.solved = board[i][j];
                temp.push(tempOccupant);

            }else {
                // At this point, we know that the square is empty

                var candidateString = tempOccupant.candidates;
                // Checking the validity of the numbers 1 through 9 for the current square
                for (var n = 1; n <= 9; n++) {
                    if (!superValid(board, n, i, j)) {
                        candidateString = candidateString.replace(n, '');
                    }
                }

                tempOccupant.candidates = candidateString;
                temp.push(tempOccupant);
            }
        }
        // Filled the occupants for one row. Push the row in the 'filledBoard' array
        filledBoard.push(temp);
    }

    return filledBoard;
}

var ok = initializeOccupants(board);
console.log(ok);
