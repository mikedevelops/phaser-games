import 'phaser-ce';
import Catalogue from '../objects/Catalogue';
import introStoreCatalogue from '../data/catalogues/introCatalogue';

export default class IntroStoreState extends Phaser.State {
    private catalogue: Catalogue;

    public preload (
        game: Phaser.Game
    ) {
        this.catalogue = new Catalogue(game, introStoreCatalogue);
        this.catalogue.preload(game);
    }

    public create (
        game: Phaser.Game
    ) {
        this.catalogue.create(game);
        game.add.existing(this.catalogue);
    }

    public update (
        game: Phaser.Game
    ) {
        this.catalogue.update();
    }
}
