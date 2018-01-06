import 'phaser-ce';
import CurrencyService from '../services/CurrencyService';

export default class Ticker extends Phaser.Text {
    constructor (
        game: Phaser.Game,
        x: number,
        y: number,
        private currency: CurrencyService,
        private tradeCurrency: string
    ) {
        super(game, x, y, '', {
            fill: 'white',
            font: 'Commodore',
            fontSize: 16
        });

        this.printCurrency();
    }

    public update () {
        this.currency.update();
        this.printCurrency();
    }

    private printCurrency () {
        const diff: number = this.currency.getDiff();
        const diffString: string = diff <= 0 ? `- ${(diff * -1).toFixed(2)}` : `+ ${diff.toFixed(2)}`;

        this.setStyle({
            fill: diff <= 0 ? 'red' : 'green',
            font: 'Commodore',
            fontSize: 16
        });
        this.text = `${this.currency.getCurrencyCode()}: ` +
            `${this.tradeCurrency}${this.currency.getPrice().toFixed(2)} | ${diffString}`;
    }
}
