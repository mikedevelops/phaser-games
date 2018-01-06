import 'phaser-ce';

export default class Wallet extends Phaser.Text {
    private amount: number;

    constructor (
        game: Phaser.Game,
        x: number,
        y: number,
        startAmount: number = 0,
        private label: string,
        private currency: string,
        private customFontStyle: {}
    ) {
        super(game, x, y, '', Object.assign({}, customFontStyle, {
            fill: 'yellow'
        }));

        // Set text
        this.text = currency + startAmount.toFixed(2);
        this.amount = startAmount;
        this.printAmount();
    }

    private printAmount (): void {
        this.text = `${this.label}\n${this.currency}${this.amount.toFixed(2)}`;
    }
}
