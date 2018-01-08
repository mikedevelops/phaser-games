import MainState from './MainState';
import TitleState from './TitleState';
import DebugState from './DebugState';
import IntroState from './IntroState';

export default class BootState extends Phaser.State {
    constructor (
        private titleState: TitleState,
        private introState: IntroState,
        private mainState: MainState
    ) {
        super();
    }

    public preload (
        game: Phaser.Game
    ) {
        game.add.text(0, 0, 'PRELOADING TEXT...', {
            font: 'Pixeled'
        });

        game.state.add('title', this.titleState);
        game.state.add('main', this.mainState);
        game.state.add('intro', this.introState);

        game.state.start('title');

        // Debug
        game.state.add('debug', new DebugState());
        game.state.start('debug');
    }
}
