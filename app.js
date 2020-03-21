const keyboard = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startGame = document.querySelector('.btn__reset');
const restartGame = document.querySelector('.btn__replay');
const startOverlay = document.querySelector('#overlay');
let missed = 0;
let letterFound;

const phrases = [
    "under the weather",
    "elephant in the room",
    "needle in a haystack",
    "head over heels",
    "on the same page"
];

//Hide start overlay screen when button is clicked
startGame.addEventListener('click', function(){
    startOverlay.style.display = 'none';
});

//Random phrase generator to guess
function getRandomPhraseAsArray(){
    let i = Math.floor((Math.random() * 4));
    return Array.from(phrases[i]);    
};

// Display the phrase
function addPhraseToDisplay(){   
    let phraseToDisplay = getRandomPhraseAsArray(); 
    let ul = document.querySelector('#phrase ul');
    for (let i = 0; i < phraseToDisplay.length; i++){
        let li = document.createElement('li');
        li.innerHTML = phraseToDisplay[i];
        if ( li.innerHTML.toUpperCase() != li.innerHTML.toLowerCase() ) {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
        ul.appendChild(li);
    } 
};

addPhraseToDisplay();

//Reveal letters in phrase
function checkLetter(buttonClicked) {
    let letters = document.querySelectorAll('.letter');
    let result = null;
    for (let i = 0; i < letters.length; i++){
        if (buttonClicked.innerHTML === letters[i].innerHTML) {
            letters[i].classList.add('show');
            buttonClicked.className = 'chosen';
            buttonClicked.disabled = true;
            letterFound = buttonClicked.innerHTML;
            result = true;
        }
    } 
    return result;
}

//Win or loose overlay
function checkWin() {
    if (missed >= 5) {
        startOverlay.style.display = 'flex';
        startOverlay.className = 'lose';
        startGame.innerHTML = 'You lost.';
        document.querySelector('.btn__replay').style.display = 'block';
    } else if (document.querySelectorAll('.letter').length === document.querySelectorAll('.show').length) {
        startOverlay.style.display = 'flex';
        startOverlay.className = 'win';
        startGame.innerHTML = 'You Won!';
        document.querySelector('.btn__replay').style.display = 'block';
    }
}

//Run game - and update missed counter
keyboard.addEventListener('click', function(event) {
    let output = checkLetter(event.target);
    if (output == null) {
        missed += 1;
        document.querySelectorAll('.tries img')[missed - 1].src = 'images/lostHeart.png';
    }
    checkWin();
});

//Restart game
restartGame.addEventListener('click', function resetGame() {
    let shownButtons = document.querySelectorAll('.chosen');
    let hearts = document.querySelectorAll('.tries img');
    startOverlay.style.display = 'none';
    document.querySelector('ul').innerHTML = '';
    addPhraseToDisplay();
    for (let i = 0; i < shownButtons.length; i++) {
        shownButtons[i].classList.remove('chosen');
        shownButtons[i].disabled = false;
    }
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].src = 'images/liveHeart.png';
    }
    missed = 0;
});