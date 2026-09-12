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
const themeSong = document.getElementById('themeSong');
const clickSong = document.getElementById('clickSong');

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

    statement.innerHTML = `${result}`;
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

function playClickSong(){
    playBtns.forEach((playBtn) => {
        playBtn.addEventListener('click', () => {
            clickSong.play();
        })
    })
}
playClickSong();

// I used AI completely for this part
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

    // Use a smooth 'sine' wave for a soft, familiar interface sound.
    oscillator.type = 'sine';
    // Start with a low pitch as the button begins to appear.
    oscillator.frequency.setValueAtTime(120, startTime);
    // Raise the pitch quickly to match the button's overshoot.
    oscillator.frequency.exponentialRampToValueAtTime(520, startTime + .12);
    // Lower the pitch as the button settles into its final size.
    oscillator.frequency.exponentialRampToValueAtTime(135, startTime + .28);

    // Begin nearly silent so the sound fades in instead of clicking.
    gain.gain.setValueAtTime(.0001, startTime);
    // Reach a quiet peak volume shortly after the sound starts.
    gain.gain.exponentialRampToValueAtTime(2.5, startTime + .02);
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
        
        themeSong.play();
        setTimeout(() => {
            playStartBounceSound();
        }, 650);

    }, 500);

}, 2000);

startBtn.addEventListener('click', () => {
    introScreen.style.opacity = '0';
    introScreen.style.pointerEvents = 'none';

    gameContainer.style.opacity = '1';
    themeSong.pause();
})
   
// for footer date
yearTxt.innerText = new Date().getUTCFullYear();

// ### Web Audio API Notes

// `AudioContext` is the browser’s audio engine. `new AudioContext()` creates an audio engine that we can use to create and control sounds.

// `window.AudioContext || window.webkitAudioContext` uses the standard `AudioContext` if the browser supports it. If it doesn't, it tries `webkitAudioContext`, which is an older Safari-compatible version. The `||` means “use the second one if the first one is unavailable.”

// `if (!AudioContext) { return; }` checks whether the browser supports the AudioContext API. The `!` means “not.” If AudioContext doesn't exist, `return` immediately exits the function.

// An `OscillatorNode` is a sound generator. `createOscillator()` creates a tone from a mathematical waveform instead of playing an existing audio file.

// The oscillator's `type` determines the shape of the sound wave. A sine wave sounds smooth and soft, while square, sawtooth, and triangle waves have different, more electronic characters.

// `frequency` controls the pitch of the sound. Frequency is measured in Hertz (Hz). A higher frequency produces a higher-pitched sound, while a lower frequency produces a lower-pitched sound.

// `setValueAtTime()` sets a value at a specific point on the audio timeline. It basically means “make this value equal to this number at this exact time.”

// `exponentialRampToValueAtTime()` smoothly changes a value toward another value over a period of time. It can be used to smoothly change pitch or volume.

// `audioContext.currentTime` gives the current time according to the audio engine. Saving it in `startTime` gives us one starting point that we can use to schedule all the sound changes accurately.

// A `GainNode` controls the volume of an audio signal. `createGain()` creates one. The gain value determines how loud the generated sound is.

// A gain value such as `.12` is quieter than `.5`. Increasing the peak gain makes the sound louder.

// Exponential volume ramps cannot start from exactly `0`, so a very small value such as `.0001` is used instead. `.0001` is practically silent but still works with an exponential ramp.

// `connect()` connects audio nodes together. The sound can flow from the oscillator into the gain node and then from the gain node into the audio output.

// `audioContext.destination` represents the final audio output, usually the user's speakers or headphones.

// `oscillator.start()` tells the oscillator when to start producing sound. `oscillator.stop()` tells it when to stop.

// The sound in this function is generated from scratch. It doesn't need an MP3 or WAV file because the oscillator creates the tone using code.

// The bounce effect is created by changing both pitch and volume over time. The pitch starts low, quickly rises, then falls again. At the same time, the volume starts almost silent, becomes louder, and fades back to almost silent.

// The basic audio flow is:

// `Oscillator → Gain → Destination → Speakers`

// A browser may block an AudioContext from playing automatically because of autoplay restrictions. Starting or resuming audio after a user interaction, such as clicking a button, is usually safer.

// Creating a new AudioContext every time a sound plays can work, but for a larger game it is generally better to create one shared AudioContext and reuse it for all sound effects.
