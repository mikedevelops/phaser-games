import Phaser = require('phaser/dist/phaser');

const game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    '',
    {
        preload,
        create
    }
);

function preload () {
        console.log('preloading...');
}

function create () {
    console.log('creating...');
}


