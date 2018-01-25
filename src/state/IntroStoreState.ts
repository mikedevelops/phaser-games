import 'phaser-ce';
import Catalogue from '../objects/Catalogue';
import introStoreCatalogue from '../data/catalogues/introCatalogue';
import GameText from '../objects/GameText';
import WalletService from '../services/WalletService';
import PlayerService from '../services/PlayerService';

export default class IntroStoreState extends Phaser.State {
    private catalogue: Catalogue;
    private wallet: WalletService;

    constructor (
        private player: PlayerService
    ) {
        super();
    }

    public preload (
        game: Phaser.Game
    ) {
        this.catalogue = new Catalogue(game, this.player.getItemsById('INTRO'));
        this.catalogue.preload(game);
        this.wallet = new WalletService();
    }

    public create (
        game: Phaser.Game
    ) {
        const balance = new GameText(game, 'foo');

        balance.setText(`${this.wallet.getCurrency()}${this.wallet.getBalance().toFixed(2)}`);
        balance.x = 10;
        balance.y = 10;

        game.add.existing(balance);

        this.catalogue.create(game);
        game.add.existing(this.catalogue);
    }

    public update (
        game: Phaser.Game
    ) {}
}
