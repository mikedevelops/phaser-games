import 'phaser-ce';
import SpeechPane from '../objects/SpeechPane';
import '../../assets/sheets/pane/pane.json';
import '../../assets/sheets/pane/pane.png';
import introductionSpeech from '../speech/introductionSpeech';

export default class IntroState extends Phaser.State {
    public preload (
        game: Phaser.Game
    ) {
        game.load.atlas('pane', 'pane.png', 'pane.json');
    }

    public create (
        game: Phaser.Game
    ) {
        const speechPane = new SpeechPane(game, introductionSpeech, 25, () => {
            game.state.start('introStore');
        });

        speechPane.setPosition(game, 'BOTTOM');
        game.add.existing(speechPane);
    }
}
