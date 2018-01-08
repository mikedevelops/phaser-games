import 'phaser-ce';

const FONT_STYLE: Phaser.PhaserTextStyle = {
    font: 'Commodore',
    fontSize: 16,
    fill: 'white'
};

export default class GameText extends Phaser.Text {
    constructor (
        game: Phaser.Game,
        text: string,
        fontStyle: {} = {}
    ) {
        super(game, 0, 0, text, Object.assign({}, FONT_STYLE, fontStyle));
    }
}
