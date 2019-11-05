(function(){
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const button = document.querySelector('button');
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
        // Change the mole speed! Moles will show up between 200ms to 800ms
        const time = randomTime(200, 800);
        const hole = randomHole(holes);
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) pop();
        }, time);
    };

    const startGame = () => {
        scoreBoard.textContent = 0;
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
    }

    moles.forEach(mole => mole.addEventListener('click', bonk));
    button.addEventListener('click', startGame);
}());