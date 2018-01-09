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
    TOP_RIGHT: 'pane 7.ase'
};

export default class TextPane extends Phaser.Sprite {
    protected paneWidth: number;
    protected paneHeight: number;
    protected gameText: GameText;
    protected res: number;
    private pane: Pane;

    constructor (
        game: Phaser.Game,
        text: string = '',
        position: string = 'BOTTOM',
        width: number = (game.width / DEFAULT_RES),
        height: number = 5,
        res: number = DEFAULT_RES
    ) {
        super(game, 0, 0, null);

        this.paneWidth = width;
        this.paneHeight = height;
        this.res = res;

        // Pane
        this.pane = new Pane(game, sprites, this.res, this.paneWidth, this.paneHeight);

        // Text
        this.gameText = new GameText(game, '', { fontSize: this.res / 2 });
        this.gameText.wordWrap = true;
        this.gameText.lineSpacing = 5;
        this.gameText.y += this.res;
        this.gameText.x += this.res;
        this.gameText.wordWrapWidth = (this.paneWidth * this.res) - (this.res * 1.5);
        this.gameText.text = text;

        // Position
        switch (position) {
            case 'BOTTOM':
            default:
                this.y = game.height - this.pane.getHeight();
        }

        // Attach
        this.addChild(this.pane);
        this.addChild(this.gameText);
    }

    public updateText (
        text: string
    ): void {
        this.gameText.text = text;
    }
}
