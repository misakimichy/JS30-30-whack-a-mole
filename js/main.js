(function(){
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const startButton = document.querySelector('.start');
    const refreshButton = document.querySelector('.refresh');
    let lastHole;
    let timeUp = false;
    let score = 0;

    const randomTime = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    // get random DOM element
    const randomHole = (holes) => {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            return randomHole(holes);
        }
        // Track the last hole that mole pops up
        lastHole = hole;
        return hole;
    };

    const pop = () => {
        // Change the mole speed! Moles will show up between 350ms to 800ms
        const time = randomTime(350, 800);
        const hole = randomHole(holes);
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) pop();
        }, time);
    };

    const startGame = () => {
        scoreBoard.textContent = 0;
        score = 0;
        timeUp = false;
        pop();
        // Game lasts 10000ms (10 seconds).
        setTimeout(() => timeUp = true, 10000);
    };

    const bonk = e => {
        if (!e.isTrusted) return;
        score++;
        e.currentTarget.classList.remove('up');
        scoreBoard.textContent = score;
    };

    const resetGame = () => {
        scoreBoard.textContent = 0;
    };

    moles.forEach(mole => mole.addEventListener('click', bonk));
    startButton.addEventListener('click', startGame);
    refreshButton.addEventListener('click', resetGame);
}());