let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#re");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#message");
let container = document.querySelector(".container");

let turnO = true;
let clickNum = 0;

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    container.classList.remove("hide");
    reset.classList.remove("hide");
} 

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        clickNum += 1;
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

resetGame();

const showWinner = (p1) => {
    msg.innerText = `Winner is ${p1}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    reset.classList.add("hide");
}

const showNoWinner = () => {
    msg.innerText = "No Winner!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    reset.classList.add("hide");
}

const checkWinner = () => {
    for(pattern of winPatterns) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;

        if ( p1 != "" && p2!="" && p3 !=""){
            if ( p1 === p2 && p2 === p3) {
                clickNum = 0;
                showWinner(p1);
            }
        }
        if (clickNum === 9) {
            clickNum = 0;
            showNoWinner();
        }
    }
}


newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
