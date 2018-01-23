import TextPane from './TextPane';
import SpeechService from '../services/SpeechService';

const sprites = {
    PROCEED: 'pane 8.ase'
};

export default class SpeechPane extends TextPane {
    private speechService: SpeechService;
    private speechTimer: number = 0;
    private blinkTimer: number = 0;
    private arrow: Phaser.Sprite;

    constructor (
        game: Phaser.Game,
        private speech: string[],
        private speed: number = 50,
        private next: () => void
    ) {
        super(game);
        // Speech Service
        this.speechService = new SpeechService(speech);

        // Arrow
        this.arrow = new Phaser.Sprite(
            game,
            (this.paneWidth * this.res) - (this.res * 2),
            (this.paneHeight * this.res) - (this.res * 2),
            'pane',
            sprites.PROCEED
        );

        this.addChild(this.arrow);

        // Input
        this.game.input.keyboard.onPressCallback = () => {
            if (game.input.keyboard.event.keyCode === Phaser.Keyboard.ENTER) {
                this.speechService.next();
            }
        };
    }

    public update () {
        // Speech type
        if (this.speechTimer >= this.speed) {
            const text = this.speechService.getText();

            // text has finished
            if (text !== null) {
                this.gameText.text = text;
            } else {
                this.next();
            }

            this.speechTimer = 0;
        }

        // Arrow blink
        if (this.blinkTimer >= 500) {
            this.arrow.visible = !this.arrow.visible;
            this.blinkTimer = 0;
        }

        this.speechTimer += this.game.time.elapsedMS;
        this.blinkTimer += this.game.time.elapsedMS;
    }
}
