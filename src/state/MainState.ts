import CurrencyService from '../services/CurrencyService';
import Ticker from '../objects/Ticker';
import Pane from '../objects/Pane';

export default class MainState extends Phaser.State {
    private tradeUI: Phaser.Group;
    private tickerGroup: Phaser.Group;
    private walletGroup: Phaser.Group;

    constructor (
        private tradeCurrency: string,
        private currencies: CurrencyService[],
        private fontStyle: {}
    ) {
        super();
    }

    public create (
        game: Phaser.Game
    ) {
        // Tickers
        this.tickerGroup = game.add.group();
        this.currencies.forEach((currency: CurrencyService, index: number) => {
            this.tickerGroup.add(
                new Ticker(
                    game,
                    0,
                    20 * index,
                    currency,
                    this.tradeCurrency,
                    this.fontStyle
                )
            );
        });
        this.tickerGroup.x = 10;
        this.tickerGroup.y = 10;

        // Trading
        this.tradeUI = game.add.group();
        this.tradeUI.x = 10;
        this.tradeUI.y = 100;

        const tradeUITitle = new Phaser.Text(game, 0, 0, 'BROKER', this.fontStyle);
        const tradeUIBuyLabel = new Phaser.Text(
            game,
            0,
            20,
            `"LET ME GET YOU IN AT 1 MSC @ ${this.tradeCurrency}${this.currencies[0].getPrice().toFixed(2)}"`,
            this.fontStyle
        );

        this.tradeUI.add(tradeUITitle);
        this.tradeUI.add(tradeUIBuyLabel);

        // Pane debug
        game.add.existing(new Pane(game, game.height / 3, game.width));
    }

    public update (
        game: Phaser.Game
    ) {
        this.tickerGroup.children.forEach((ticker: Ticker) => ticker.update);
    }
}
