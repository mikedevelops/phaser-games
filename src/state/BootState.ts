import MainState from "./MainState";

export default class BootState extends Phaser.State {
    constructor (
        private mainState: Phaser.State
    ) {
        super();
    }

    public preload (
        game: Phaser.Game
    ) {
        game.add.text(0, 0, 'PRELOADING TEXT...', {
            font: 'Pixeled'
        });

        game.state.add('main', this.mainState);
        game.state.start('main');
    }
}
