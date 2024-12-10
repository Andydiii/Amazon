//  update current score = last recorded score
let score = JSON.parse(localStorage.getItem
("score")) || {
   wins: 0,
   lost: 0,
   tie: 0  
}

// update result and playerMove and score on the page
updateinfo(userMove, computer, result);

// update page informtation: result, playerMove, score
function updateinfo(userMove, computerMove, result) {
   document.querySelector('.js-score')
       .innerHTML = `wins: ${score.wins}, lost: ${score.lost}, ties: ${score.tie}`;

   document.querySelector('.js-play-result')
       .innerHTML = `You ${result}`;

   if (result != 'reseted') {
       document.querySelector('.js-player-move')
       .innerHTML = `You
                   <img class="move-icon" src="./pic/${userMove}.png" alt="">
                   VS
                   <img class="move-icon" src="./pic/${computerMove}.png" alt="">
                   Computer`;
   }
}

// random return a move for computer 
function computerMove() {
   let computer = Math.random();

   if (computer <= 1/3) {
       return 'paper';
   }
   else if (computer <= 2/3) {
       return 'scissor';
   }
   else {
       return'rock';
   }
   
}

// user vs computer and update score
function playgame(userMove) {
   //playe result
   let result = '';

   //computer move
   const computer = computerMove();

   if (userMove === computer) {
       result = 'tie';
   }
   else if (userMove === 'paper') {
       if (computer === 'rock') {
           result = 'won';
       }
       else {
           result = 'lost';
       }
   }
   else if (userMove === 'scissor') {
       if (computer === 'rock') {
           result = 'lost';
       } 
       else {
           result = 'won';
       }
   }
   // user is rock
   else {
       if(computer === 'paper') {
           result = 'lost'
       }
       else {
           result = 'won';
       }
   }
   
   if (result === 'won') {
       score.wins++;
   }
   else if (result === 'lost') {
       score.lost++;
   }
   else {
       score.tie++;
   }

   // update result and playerMove and score on the page
   updateinfo(userMove, computer, result);

   // update score in the local storage
   localStorage.setItem("score", JSON.stringify(score));

//                 // print it on the page
//                 alert(`You picked ${userMove}. Computer picked ${computer}. you have ${result}.
// wins: ${score.wins}, lost: ${score.lost}, ties: ${score.tie}`);
}
