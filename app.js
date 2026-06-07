const statement = document.querySelector('#statement');
const comScore = document.querySelector('.comScore');
const plaScore = document.querySelector('.plaScore');
const yearTxt = document.getElementById('yearTxt');
const comImg = document.getElementById('comImg');
const playerImg = document.getElementById('playerImg');
const getImgs = document.querySelectorAll('.img');
const loadingScreen = document.getElementById('loadingScreen');
const introScreen = document.getElementById('introScreen');
const gameContainer = document.getElementById('gameContainer');
const startBtn = document.getElementById('startBtn');
console.log(startBtn);

const imgs = [
            './assets/fist.png',
            './assets/stop (1).png',
            './assets/v (1).png'
        ];

function insertImg(){
    let img;

    //Cleaner way
    for(let i = 0; i < getImgs.length; i++){
        getImgs[i].src = imgs[i % 3];
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

    if(playerMove === 'Scissors'){
        if(computerMove === 'Rock'){
            result = 'You Lose';
        }else if(computerMove === 'Paper'){
            result = 'You Win !';
        }else if(computerMove === 'Scissors'){
            result = 'Tie';
        }
        playerImg.src = './assets/v (1).png';
    }
    else if(playerMove === 'Paper'){ 
        if(computerMove === 'Rock'){
            result = 'You Win !';
        }else if(computerMove === 'Paper'){
            result = 'Tie';
        }else if(computerMove === 'Scissors'){
            result = 'You Lose';
        }
        playerImg.src = './assets/stop (1).png';
    }
    else{
        if(computerMove === 'Rock'){
            result = 'Tie';
        }else if(computerMove === 'Paper'){
            result = 'You Lose';
        }else if(computerMove === 'Scissors'){
            result = 'You Win !';
        }
        playerImg.src = './assets/fist.png';
    }

    if(result === 'You Win !'){
        score.Wins ++;
    }else if(result === 'You Lose'){
        score.Losses += 1;
    }else{
        score.Ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    statement.innerHTML = `-> ${result} <-`;
    plaScore.innerHTML = `${score.Wins}`;
    comScore.innerHTML = `${score.Losses}`;
}

function pickComputerMove(){
    const randomNumber = Math.floor(Math.random()*3);

    if(randomNumber == 0){
        computerMove = 'Rock';
        comImg.src = './assets/fist.png';
    }else if(randomNumber == 1){
        computerMove = 'Paper';
        comImg.src = './assets/stop (1).png';
    }else if(randomNumber == 2){
        computerMove = 'Scissors';
        comImg.src = './assets/v (1).png';
    }
}

setTimeout(() => {
    loadingScreen.style.opacity = '0';

    setTimeout(() => {
        loadingScreen.style.display = 'none';

        introScreen.style.opacity = '1';
        introScreen.style.pointerEvents = 'auto';

    }, 500);

}, 3000);

startBtn.addEventListener('click', () => {
    introScreen.style.opacity = '0';
    introScreen.style.pointerEvents = 'none';

    gameContainer.style.opacity = '1';
})
    
// for footer date
const getDate = new Date();
yearTxt.innerText = getDate.getUTCFullYear();