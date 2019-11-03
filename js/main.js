(function(){
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const button = document.querySelector('button');
    let lastHole;
    let timeUp;

    const randomTime = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    // get random DOM element
    const randomHole = (holes) => {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            console.log('This is the same hole.');
            return randomHole(holes);
        }

        // Track the last hole that mole pops up
        lastHole = hole;
        return hole;
    };

    const pop = () => {
        const time = randomTime(200, 1000);
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
        setTimeout(() => timeUp = true, 10000);
    };

    button.addEventListener('click', startGame);
}());