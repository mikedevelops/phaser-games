import CurrencyService from '../services/CurrencyService';
import Ticker from '../objects/Ticker';

export default class MainState extends Phaser.State {
    private tickers: Phaser.Group;

    constructor (
        private tradeCurrency: string,
        private currencies: CurrencyService[]
    ) {
        super();
    }

    public create (
        game: Phaser.Game
    ) {
        // Tickers
        this.tickers = game.add.group();
        this.currencies.forEach((currency: CurrencyService, index: number) => {
            const ticker: Ticker = new Ticker(game, 0, 20 * index, currency, this.tradeCurrency);

            this.tickers.add(ticker);
        });
        this.tickers.x = 10;
        this.tickers.y = 10;
    }

    public update (
        game: Phaser.Game
    ) {
        this.tickers.children.forEach((ticker: Ticker) => ticker.update);
    }
}
