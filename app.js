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
const playBtns = document.querySelectorAll('.play-btn');
const resetBtn = document.getElementById('resetBtn');
const muteBtn = document.querySelector('.mute-btn');
 
const themeSong = document.getElementById('themeSong');

const imgs = [
            './assets/fist.png',
            './assets/stop (1).png',
            './assets/v (1).png'
        ];

insertImg();
function insertImg(){
    for(let i = 0; i < getImgs.length; i++){
        getImgs[i].src = imgs[i % 3];
    }
}

muteBtn.addEventListener('click', () => {
    if(muteBtn.classList.contains('fa-volume-xmark')){
        muteBtn.classList.remove('fa-volume-xmark');
        muteBtn.classList.add('fa-volume-low');

        themeSong.pause();
    }else{
        muteBtn.classList.remove('fa-volume-low');
        muteBtn.classList.add('fa-volume-xmark');

        themeSong.play().catch(error => console.warn('Theme music could not be played:', error));
    }
})

playBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(btn.classList.contains("rock-btn")){
            playGame('Rock');
        }else if(btn.classList.contains("paper-btn")){
            playGame('Paper');
        }else{
            playGame('Scissors');
        }

        playStartBounceSound();
    })
})

resetBtn.addEventListener('click', () => {
    score.Wins = 0;
    score.Losses = 0;
    score.Ties = 0;

    localStorage.removeItem('score');

    plaScore.innerHTML = `${score.Wins}`;
    comScore.innerHTML = `${score.Losses}`;
    statement.innerHTML = 'Reset the SCORES!';

    setTimeout(() => statement.innerHTML = `PLAY AGAIN ?`, 1000);

    comImg.src = './assets/fist.png';
    playerImg.src = './assets/fist.png';
})

let computerMove = ' ';
const score = JSON.parse(localStorage.getItem('score')) || {
    Wins: 0,
    Losses: 0,
    Ties: 0
};

if(JSON.parse(localStorage.getItem('score'))){
    plaScore.innerHTML = score.Wins;
    comScore.innerHTML = score.Losses
}

function playGame(playerMove){  //parameter function
    let result = '';
    pickComputerMove();   

    if(playerMove === 'Scissors'){
        if(computerMove === 'Rock'){
            result = 'You Lose !';
        }else if(computerMove === 'Paper'){
            result = 'You Won !';
        }else if(computerMove === 'Scissors'){
            result = 'Tie';
        }
        playerImg.src = './assets/v (1).png';
    }
    else if(playerMove === 'Paper'){ 
        if(computerMove === 'Rock'){
            result = 'You Won !';
        }else if(computerMove === 'Paper'){
            result = 'Tie';
        }else if(computerMove === 'Scissors'){
            result = 'You Lose !';
        }
        playerImg.src = './assets/stop (1).png';
    }
    else{
        if(computerMove === 'Rock'){
            result = 'Tie';
        }else if(computerMove === 'Paper'){
            result = 'You Lose !';
        }else if(computerMove === 'Scissors'){
            result = 'You Won !';
        }
        playerImg.src = './assets/fist.png';
    }

    if(result === 'You Won !'){
        score.Wins += 1 ;

        if(score.Wins > 0) plaScore.classList.add('change');

        setTimeout(() => plaScore.classList.remove('change'), 500);

    }else if(result === 'You Lose !'){
        score.Losses += 1;

        if(score.Losses > 0) comScore.classList.add('change');

        setTimeout(() => comScore.classList.remove('change'), 500);

    }else{
        score.Ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    statement.textContent = `${result}`;
    plaScore.textContent = `${score.Wins}`;
    comScore.textContent = `${score.Losses}`;
}

function pickComputerMove(){
    const randomNumber = Math.ceil(Math.random()*3);

    if(randomNumber === 0){
        computerMove = 'Rock';
        comImg.src = './assets/fist.png';
    }else if(randomNumber === 1){
        computerMove = 'Paper';
        comImg.src = './assets/stop (1).png';
    }else if(randomNumber === 2){
        computerMove = 'Scissors';
        comImg.src = './assets/v (1).png';
    }
}

let bounceAudioContext;

function playStartBounceSound(){
    // Use the browser's standard audio engine, with a Safari-compatible fallback.
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

    if(!AudioContextConstructor) return;

    try {
        if(!bounceAudioContext || bounceAudioContext.state === 'closed'){
            bounceAudioContext = new AudioContextConstructor();
        }

        const playSound = () => {
            const oscillator = bounceAudioContext.createOscillator();
            const gain = bounceAudioContext.createGain();
            const startTime = bounceAudioContext.currentTime;

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(120, startTime);
            oscillator.frequency.exponentialRampToValueAtTime(520, startTime + .12);
            oscillator.frequency.exponentialRampToValueAtTime(135, startTime + .28);

            gain.gain.setValueAtTime(.0001, startTime);
            gain.gain.exponentialRampToValueAtTime(2.5, startTime + .02);
            gain.gain.exponentialRampToValueAtTime(.0001, startTime + .3);

            oscillator.connect(gain);
            gain.connect(bounceAudioContext.destination);
            oscillator.start(startTime);
            oscillator.stop(startTime + .3);
        };

        if(bounceAudioContext.state === 'running'){
            playSound();
        }else{
            bounceAudioContext.resume().then(playSound).catch(error => {
                console.warn('Click sound could not be played:', error);
            });
        }
    }catch(error){
        console.warn('Click sound could not be played:', error);
    }
}

sessionStorage.setItem('startBouncePlayed', 'true');

setTimeout(() => {
    loadingScreen.style.opacity = '0';
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        
        introScreen.style.opacity = '1';
        introScreen.style.pointerEvents = 'auto';
        introScreen.classList.add('is-visible');
        
        setTimeout(() => {
            if(sessionStorage.getItem('startBouncePlayed') !== 'false') playStartBounceSound();
        }, 650);

    }, 500);

}, 2000);

startBtn.addEventListener('click', () => {
    introScreen.style.opacity = '0';
    introScreen.style.pointerEvents = 'none';
    
    gameContainer.style.opacity = '1';
    muteBtn.style.opacity = '1';
})
   
// for footer date
yearTxt.innerText = new Date().getUTCFullYear();