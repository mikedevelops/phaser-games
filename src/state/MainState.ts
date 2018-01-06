import CurrencyService from '../services/CurrencyService';
import Ticker from '../objects/Ticker';
import Wallet from '../objects/Wallet';

export default class MainState extends Phaser.State {
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

        // Wallet
        this.walletGroup = game.add.group();
        this.walletGroup.add(
            new Wallet(
                game,
                0,
                0,
                10000,
                'BROKER ACCOUNT',
                this.tradeCurrency,
                this.fontStyle
            )
        );
        this.walletGroup.x = (game.width - this.walletGroup.width) - 10;
        this.walletGroup.y = 10;
    }

    public update (
        game: Phaser.Game
    ) {
        this.tickerGroup.children.forEach((ticker: Ticker) => ticker.update);
    }
}
