import 'phaser-ce';
import Pane from '../objects/Pane';
import SpeechService from '../services/SpeechService';
import GameText from '../objects/GameText';

const DEFAULT_RES = 32;
const sprites = {
    HORIZONTAL_BOTTOM: 'pane 0.ase',
    HORIZONTAL_TOP: 'pane 1.ase',
    VERTICAL_RIGHT: 'pane 2.ase',
    VERTICAL_LEFT: 'pane 3.ase',
    TOP_LEFT: 'pane 4.ase',
    BOTTOM_RIGHT: 'pane 5.ase',
    BOTTOM_LEFT: 'pane 6.ase',
    TOP_RIGHT: 'pane 7.ase',
    PROCEED: 'pane 8.ase'
};

export default class TextPane extends Phaser.Sprite {
    private speechService: SpeechService;
    private speechTimer: number = 0;
    private blinkTimer: number = 0;
    private gameText: GameText;
    private pane: Pane;
    private arrow: Phaser.Sprite;

    constructor (
        game: Phaser.Game,
        speech: string[],
        private speed: number = 50,
        position: string = 'BOTTOM',
        width: number = (game.width / DEFAULT_RES),
        height: number = 5,
        res: number = DEFAULT_RES
    ) {
        super(game, 0, 0, null);

        // Pane
        this.pane = new Pane(game, sprites, res, width, height);

        // Speech Service
        this.speechService = new SpeechService(speech);

        // Text
        this.gameText = new GameText(game, '', { fontSize: res / 2 });
        this.gameText.wordWrap = true;
        this.gameText.lineSpacing = 5;
        this.gameText.y += res;
        this.gameText.x += res;
        this.gameText.wordWrapWidth = (width * res) - (res * 1.5);

        // Arrow
        this.arrow = new Phaser.Sprite(
            game,
            (width * res) - (res * 2),
            (height * res) - (res * 2),
            'pane',
            sprites.PROCEED
        );

        // Position
        switch (position) {
            case 'BOTTOM':
            default:
                this.y = game.height - this.pane.getHeight();
        }

        // Attach
        this.addChild(this.arrow);
        this.addChild(this.pane);
        this.addChild(this.gameText);

        // Input
        this.game.input.keyboard.onPressCallback = () => {
            if (game.input.keyboard.pressEvent.charCode === Phaser.Keyboard.ENTER) {
                this.speechService.next();
            }
        };
    }

    public update () {
        // Speech type
        if (this.speechTimer >= this.speed) {
            this.updateText();
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

    private updateText (): void {
        const text = this.speechService.getText();

        if (text !== null) {
            this.gameText.text = text;
        }
    }
}
