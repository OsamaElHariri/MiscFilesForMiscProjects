
// Fills the boardState array with 0's 
function fillZeroes(boardState){
    for(var i = 0; i < 9; i++){
        boardState[i] = [0,0,0,0,0,0,0,0,0];
    }
}


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
function superValid(boardSt,n, row, colomn){
    if(validColumn(boardSt, n, colomn) && validRow(boardSt, n, row) && validSquare(boardSt, n, row, colomn)){
        return true;
    }
    // Otherwise, one of them is false, so return false
    return false;
}


// Returns the coords the next square in the form of [row, colomn]
function nextSquare(row, colomn){
    if(colomn === 8){
        return [row + 1, 0];
    }else{
        return [row, colomn + 1]
    }
}


// Fills a square with a random, valid number
function fillSquare(boardState, row, colomn){
    var nextSqr = nextSquare(row, colomn);  // The square to be filled after the current one
    var invalids = [true,true,true,true,true,true,true,true,true];  // We will check the validity of the numbers 1 to 9 in order to randomly select a VALID number
    var numOfInvalids = 0;

    //Check the validity of the numbers 1 to 9 for the current row and colomn
    for(var x = 1; x <= 9; x++){
        if(!superValid(boardState, x, row, colomn)){
            invalids[x-1] = false;
            numOfInvalids++;
        }
    }


    do {
        // If the currentOccupant is not 0, it means that the recursive call returned false, and so the currentOccupant is an invalid number
        var currentOccupant = boardState[row][colomn];
        if(currentOccupant !== 0){
            invalids[currentOccupant - 1] = false;  //invalids[currentOccupant - 1] because the indexes are from 0 to 8, not 1 to 9
            numOfInvalids++;
        }

        // If all the numbers are invalid, revert this square to 0, and return false
        if(numOfInvalids === 9){
            boardState[row][colomn] = 0;
            return false
        }


        // Now that we know which numbers are valid, we will select a random number from the valid ones
        var rand = Math.floor(Math.random() * (9 - numOfInvalids) + 1);

        // The indexes of the invalids array are 1 minus the value that will be put in the given square
        for (var x = 0; x < rand; x++) {
            // Skip the values that are invalid
            if (!invalids[x]) {
                rand++;
            }
            if (x === (rand - 1)) {
                boardState[row][colomn] = x + 1;
            }
        }

        // If the final square is filled, then return true
        if(row === 8 && colomn === 8) return true;
    }while(!fillSquare(boardState, nextSqr[0], nextSqr[1]));

    // If the while loop has been existed, it means that the board is complete. So, return true
    return true;



}


// Fills a 2D array, that will represent the state of the board, with random, valid numbers
function createBoard(){
    var boardState = [];    // boardState[row][column] .2D array that will hold the positions of the numbers

    fillZeroes(boardState);
    fillSquare(boardState, 0, 0);
    return boardState;
}
