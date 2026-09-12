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

const imgs = [
            './assets/fist.png',
            './assets/stop (1).png',
            './assets/v (1).png'
        ];

function insertImg(){
    let img;

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

if(JSON.parse(localStorage.getItem('score'))){
    plaScore.innerHTML = score.Wins;
    comScore.innerHTML = score.Losses
}

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
        score.Wins += 1;
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

// I use AI completely for this part
function playStartBounceSound(){
    // Use the browser's standard audio engine, with a Safari-compatible fallback.
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if(!AudioContext){
        return;
    }

    // Create a new audio engine for this short sound effect.
    const audioContext = new AudioContext();
    // Create the tone generator that will make the bounce sound.
    const oscillator = audioContext.createOscillator();
    // Create a volume controller so the sound can fade smoothly.
    const gain = audioContext.createGain();
    // Store one shared starting point for all sound timing values.
    const startTime = audioContext.currentTime;

    // Use a smooth sine wave for a soft, familiar interface sound.
    oscillator.type = 'sine';
    // Start with a low pitch as the button begins to appear.
    oscillator.frequency.setValueAtTime(180, startTime);
    // Raise the pitch quickly to match the button's overshoot.
    oscillator.frequency.exponentialRampToValueAtTime(520, startTime + .12);
    // Lower the pitch as the button settles into its final size.
    oscillator.frequency.exponentialRampToValueAtTime(260, startTime + .28);

    // Begin nearly silent so the sound fades in instead of clicking.
    gain.gain.setValueAtTime(.0001, startTime);
    // Reach a quiet peak volume shortly after the sound starts.
    gain.gain.exponentialRampToValueAtTime(.12, startTime + .02);
    // Fade the sound almost completely out by the end of the bounce.
    gain.gain.exponentialRampToValueAtTime(.0001, startTime + .3);

    // Send the oscillator's tone through the volume controller.
    oscillator.connect(gain);
    // Send the controlled sound to the user's speakers.
    gain.connect(audioContext.destination);
    // Start producing the tone at the shared start time.
    oscillator.start(startTime);
    // Stop the oscillator after the 300-millisecond sound effect ends.
    oscillator.stop(startTime + .3);
}

setTimeout(() => {
    loadingScreen.style.opacity = '0';

    setTimeout(() => {
        loadingScreen.style.display = 'none';

        introScreen.style.opacity = '1';
        introScreen.style.pointerEvents = 'auto';
        introScreen.classList.add('is-visible');

        setTimeout(() => {
            playStartBounceSound();
        }, 650);

    }, 500);

}, 2000);

startBtn.addEventListener('click', () => {
    introScreen.style.opacity = '0';
    introScreen.style.pointerEvents = 'none';

    gameContainer.style.opacity = '1';
})
    
// for footer date
yearTxt.innerText = new Date().getUTCFullYear();