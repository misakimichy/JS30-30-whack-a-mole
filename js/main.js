(function(){
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    let lastHole;

    const randTime = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    // get random DOM element
    const randomHole = (holes) => {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            console.log('This is the same hole.');
            randomHole(holes);
        }

        // Track the last hole that mole pops up
        lastHole = hole;
    };

    const body = document.querySelector('body');
    body.addEventListener('click', randomHole);

}());