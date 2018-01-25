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
    }

    public create (
        game: Phaser.Game
    ) {
        const balance = new GameText(game, 'foo');

        balance.setText(this.player.printWalletBalance());
        balance.x = 10;
        balance.y = 10;

        game.add.existing(balance);

        this.catalogue.create(game);
        game.add.existing(this.catalogue);

        // Buy item
        game.input.keyboard.onDownCallback = () => {
            this.catalogue.handleKeyDown(game);

            switch (game.input.keyboard.event.keyCode) {
                case Phaser.Keyboard.ENTER:
                    this.player.buyProduct(this.catalogue.getCatalogueId(), this.catalogue.getActiveItem());
                    balance.setText(this.player.printWalletBalance());
                    break;
            }
        };

        game.input.keyboard.onUpCallback = () => {
            this.catalogue.handleKeyUp();
        };
    }

    public update (
        game: Phaser.Game
    ) {}
}
