import 'phaser-ce';

export default class Wallet extends Phaser.Text {
    constructor (
        game: Phaser.Game,
        x: number,
        y: number,
        startAmount: number = 0,
        currency: string = '£'
    ) {
        super(game, x, y, '', {
            fill: 'white'
        });

        // Set text
        this.text = currency + startAmount.toFixed(2);
    }
}
