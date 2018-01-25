import Carousel from './Carousel';
import { CatalogueInterface, UserCatalogueInterface } from '../interfaces/catalogue';
import GameText from './GameText';
import TextPane from './TextPane';

export default class Catalogue extends Carousel {
    private descriptionPane: TextPane;
    private price: GameText;

    constructor (
        game: Phaser.Game,
        catalogue: UserCatalogueInterface
    ) {
        super(game, catalogue);
    }

    public preload (
        game: Phaser.Game
    ) {
        super.preload(game);

        game.load.atlas('pane', 'pane.png', 'pane.json');
    }

    public create (
        game: Phaser.Game
    ) {
        // price
        this.price = new GameText(game, 'foo', { align: 'center' });

        // description pane
        this.descriptionPane = new TextPane(game);
        this.descriptionPane.setPosition(game, 'BOTTOM');

        this.addChild(this.price);
        this.addChild(this.descriptionPane);

        super.create(game);

        // price positioning
        this.price.y = this.background.height - (this.price.height / 2) + this.topPadding;
        this.price.x = this.background.width / 2;
        this.price.wordWrapWidth = 500;
        this.price.anchor.setTo(0.5);
    }

    public update () {
        this.descriptionPane.updateText(this.catalogue.printActiveProduct());
        this.price.text = this.catalogue.printActiveProductPrice();
    }
}
