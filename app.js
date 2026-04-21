const imgs = [
            './assets/fist.png',
            './assets/stop (1).png',
            './assets/v (1).png'
        ];
const getStatement = document.querySelector('#statement');
const getComScore = document.querySelector('.comScore');
const getPlaScore = document.querySelector('.plaScore');
const getYearTxt = document.getElementById('yearTxt');
const getComImg = document.getElementById('comImg');
const getPlayerImg = document.getElementById('playerImg');
const getImgs = document.querySelectorAll('#img');

//insert img to buttons
function insertImg(){
    let img;
    for(let i = 0; i < getImgs.length; i++){
        for(let x = 0; x <= i; x++){
            img = imgs[x];
        }
        getImgs[i].src = img;
    }
}
insertImg();

let computerMove = ' ';
const score = JSON.parse(localStorage.getItem('score')) || {
    Wins: 0,
    Losses: 0,
    Ties: 0
};

function playGame(playerMove){  //parameter function

    pickComputerMove();   
    // animateScores();  

    if(playerMove === 'Scissors'){
        if(computerMove === 'Rock'){
            result = 'You Lose';
        }else if(computerMove === 'Paper'){
            result = 'You Win !';
        }else if(computerMove === 'Scissors'){
            result = 'Tie';
        }
        getPlayerImg.src = './assets/v (1).png';
    }
    else if(playerMove === 'Paper'){ 
        if(computerMove === 'Rock'){
            result = 'You Win !';
        }else if(computerMove === 'Paper'){
            result = 'Tie';
        }else if(computerMove === 'Scissors'){
            result = 'You Lose';
        }
        getPlayerImg.src = './assets/stop (1).png';
    }
    else{
        if(computerMove === 'Rock'){
            result = 'Tie';
        }else if(computerMove === 'Paper'){
            result = 'You Lose';
        }else if(computerMove === 'Scissors'){
            result = 'You Win !';
        }
        getPlayerImg.src = './assets/fist.png';
    }

    if(result === 'You Win !'){
        score.Wins ++;
    }else if(result === 'You Lose'){
        score.Losses += 1;
    }else{
        score.Ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    getStatement.innerHTML = `-> ${result} <-`;
    getPlaScore.innerHTML = `${score.Wins}`;
    getComScore.innerHTML = `${score.Losses}`;
}

// function animateScores(){
//     if(score.Wins > 0){
//         getPlaScore.classList.add("pop");
//         setIimeout(function(){
//             getPlaScore.classList.remove("pop");
//         },2000);
//     }else if(score.Losses > 0){
//         getComScore.classList.add("pop");
//         setIimeout(function(){
//             getComScore.classList.remove("pop");
//         },2000);
//     }
// }

function pickComputerMove(){
    const randomNumber = Math.floor(Math.random()*3);

    if(randomNumber == 0){
        computerMove = 'Rock';
        getComImg.src = './assets/fist.png';
    }else if(randomNumber == 1){
        computerMove = 'Paper';
        getComImg.src = './assets/stop (1).png';
    }else if(randomNumber == 2){
        computerMove = 'Scissors';
        getComImg.src = './assets/v (1).png';
    }
}

// for footer date
const getDate = new Date();
getYearTxt.innerText = getDate.getUTCFullYear();