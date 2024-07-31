let buttons = document.querySelectorAll("button");
let playerSwitch = false;

const allWinningSet = {
    1: new Set([0, 1, 2]),
    2: new Set([3, 4, 5]),
    3: new Set([6, 7, 8]),
    4: new Set([0, 3, 6]),
    5: new Set([1, 4, 7]),
    6: new Set([2, 5, 8]),
    7: new Set([0, 4, 8]),
    8: new Set([2, 4, 6])
};
let countSet1 = {};
let countSet2 = {};
let player1Arr = [];
let player2Arr = {};
let isGameOver = false;
let player1Set = {};
let player2Set = {};
let count = 0;
let isGameStart = false;

buttons[9].addEventListener("click", function() {
    if(buttons[9].innerHTML != "Reset"){
        buttons[9].innerHTML = "Reset";
        document.querySelectorAll("p")[1].innerHTML = "O's turn";
        isGameStart = true;
    }
    else{
        resetGame();
        document.querySelectorAll("p")[1].innerHTML = "";
        buttons[9].innerHTML = "Start Game";
    }
    
});

for (let i = 0; i < 9; i++) {
    buttons[i].addEventListener("click", function() {
        if (isGameStart) {
            if (playerSwitch === false) {
                if (buttons[i].innerHTML == "" && isGameOver == false) {
                    buttons[i].innerHTML = "O";
                    count += 1;
                    document.querySelectorAll("p")[1].innerHTML = "X's turn";

                    let countAndKey = createCountSet(i);
                    
                    if (countAndKey[0] == 3) {
                        document.querySelectorAll("p")[1].innerHTML = "O Wins!!";
                        isGameOver = true;
                        
                    } else if (count == 9) {
                        document.querySelectorAll("p")[1].innerHTML = "Draw";
                        
                    }
                    playerSwitch = true;
                }
            } else {
                if (buttons[i].innerHTML == "" && isGameOver == false) {
                    buttons[i].innerHTML = "X";
                    count += 1;
                    document.querySelectorAll("p")[1].innerHTML = "O's turn";

                    let countAndKey = createCountSet(i);
                  
                    if (countAndKey[0] == 3) {
                        document.querySelectorAll("p")[1].innerHTML = "X wins!!";
                        isGameOver = true;
                       
                    } else if (count == 9) {
                        document.querySelectorAll("p")[1].innerHTML = "Draw";
                        
                    }
                    playerSwitch = false;
                }
            }
        }
    });
}

function createCountSet(buttonNum) {
    let count = 0;
    let setNum = 0;
    let countSet = {}
    if (playerSwitch == true) {
        countSet = countSet1;
    } else {
        countSet = countSet2;
    }
    for (const key in allWinningSet) {
        if (allWinningSet.hasOwnProperty(key)) {
            if (allWinningSet[key].has(buttonNum)) {
                if (!countSet.hasOwnProperty(key)) {
                    countSet[key] = 1;
                } else {
                    countSet[key]++;
                    if (countSet[key] == 3) {
                        count = 3;
                        setNum = key;
                        markWinningLine(allWinningSet[key], key);
                        return [count, setNum];
                    }
                }
            }
        }
    }
    return [count, setNum];
}

function markWinningLine(winningSet, key) {
    let className = '';
    switch (parseInt(key)) {
        case 1:
        case 2:
        case 3:
            className = 'horizontal';
            break;
        case 4:
        case 5:
        case 6:
            className = 'vertical';
            break;
        case 7:
            className = 'diagonal1';
            break;
        case 8:
            className = 'diagonal2';
            break;
    }
    winningSet.forEach(index => {
        buttons[index].classList.add('win', className);
    });
}


function resetGame() {
    playerSwitch = false;
    countSet1 = {};
    countSet2 = {};
    isGameOver = false;
    count = 0;
    isGameStart = false;

    for (let i = 0; i < 9; i++) {
        buttons[i].innerHTML = "";
        buttons[i].classList.remove('win', 'horizontal', 'vertical', 'diagonal1', 'diagonal2');
    }
   
}
