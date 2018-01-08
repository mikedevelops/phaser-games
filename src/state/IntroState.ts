import 'phaser-ce';
import TextPane from '../objects/TextPane';
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
        game.add.existing(new TextPane(game, introductionSpeech, 25));
    }
}
