function renderBoard(matrix){
    var board = document.getElementById("board");
    matrix.forEach((matrixRow,i) => {
        var row = document.createElement("div");
        row.className = "row";
        board.appendChild(row);
        matrixRow.forEach((cube,j)=>{
            var box = document.createElement("a");
            box.className = "square";
            box.id = 3*i + j;
            box.addEventListener('click',function() {
                changeNumber(this.id);
            });
            box.style.backgroundColor ="red";
            box.innerHTML = cube;
            row.appendChild(box);
        });
    });
    checkBoard();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRndInteger(min,max) {
    return Math.floor(Math.random() * (max-min + 1)) + min;
}

function changeNumber(id) {
    let emptyCubeId = getEmptyCube(id);
    if (emptyCubeId === undefined){
        return;
    }
    var cube = document.getElementById(id);
    var emptyCube = document.getElementById(emptyCubeId);
    emptyCube.innerHTML = cube.innerHTML;
    cube.innerHTML = null;
    swapInMatrix(id,emptyCubeId);
    checkBoard();
}

function getEmptyCube(cubeIndex) {
    let row = Math.floor(cubeIndex/3);
    let col = cubeIndex % 3;
    if(matrix[row][col+1] === null){
        return 3*row + (col+1)
    }
    if (matrix[row][col-1] === null){
        return 3*row + (col-1);
    }
    if(row >  0){
        if (matrix[row-1][col] === null){
            return 3*(row-1)+col
        }
    }
    if(row < 2){
        if (matrix[row+1][col] === null){
            return 3*(row+1)+col
        }
    }
    
    return undefined;
}

function swapInMatrix(firstIndex,SecIndex) {
    firstRow  = Math.floor(firstIndex/3);
    firstCol = firstIndex % 3;
    secRow = Math.floor(SecIndex/3);
    secCol = SecIndex % 3;

    let swapValue = matrix[firstRow][firstCol];
    matrix[firstRow][firstCol] = matrix[secRow][secCol];
    matrix[secRow][secCol] = swapValue;
}

function checkBoard() {
    let score = 0;
    matrix.forEach((row,i) => {
        row.forEach((box,j) => {
            let boxIndex = 3*i+j;
            if ((boxIndex+1) === box){
                changeBoxStatus(boxIndex,"green");
                score++;
            }
            else{
                changeBoxStatus(boxIndex,(box)? "red":"gray");
            }
        })
    })
    console.log((score === 8) ? "win" : score);
}

function changeBoxStatus(boxIndex,color) {
    var b = document.getElementById(boxIndex);
    b.style.backgroundColor = color
}

var matrix = Array.from(Array(3),()=> new Array(3));
var numbers = [1,2,3,4,5,6,7,8,9];
var missinNumber = getRndInteger(0,8);
shuffleArray(numbers);
numbers[missinNumber] = null;

for (let i = 0; i < 9; i++) {
    let row = Math.floor(i/3);
    let col = i %3;
    matrix[row][col] = numbers[i];
}

renderBoard(matrix);
