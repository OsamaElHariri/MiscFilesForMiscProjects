var sideLength = 50 + "px";


// Takes a 2D array as a parameter, populates a table with the content of that array
function populateTable(bState){

    var table = document.getElementById("SudokuBoard");

    for(var i = 0; i < 9; i++){
        var tableRow = document.createElement("tr");
        for(var j = 0; j < 9; j++){
            var tableData = document.createElement("td");
            var textNode = document.createTextNode(boardState[i][j]);
            tableData.setAttribute("height", sideLength);
            tableData.setAttribute("width", sideLength);

            // Append the text to the td element
            tableData.appendChild(textNode);

            // Append the td element to the tr element
            tableRow.appendChild(tableData);

        }
        // Append the tr element to the table
        table.appendChild(tableRow);
    }
}