import 'phaser-ce';
import '../../assets/sheets/catalogue/catalogue.json';
import '../../assets/sheets/catalogue/catalogue.png';
import '../../assets/sheets/products/products@4x.json';
import '../../assets/sheets/products/products@4x.png';
import CatalogueService from '../services/CatalogueService';
import { CatalogueInterface } from '../interfaces/catalogue';
import Product from './Product';
import GameText from './GameText';

const sprites = {
    ARROW: 'catalogue.ase'
};

export default class Carousel extends Phaser.Sprite {
    protected background: Phaser.Graphics;
    protected catalogue: CatalogueService;
    protected topPadding: number;
    private item: Product;

    constructor (
        game: Phaser.Game,
        items: CatalogueInterface,
        private arrowScale: number = 1.5,
        width: number = game.width / 1.5,
        x: number = 0,
        y: number = 0
    ) {
        super(game, x, y);

        // catalogue
        this.catalogue = new CatalogueService(items);
    }

    public preload (
        game: Phaser.Game
    ) {
        game.load.atlas('catalogue', 'catalogue.png', 'catalogue.json');
        game.load.atlas('products', 'products@4x.png', 'products@4x.json');
    }

    public create (
        game: Phaser.Game
    ) {
        // arrows
        const leftArrow = new Phaser.Sprite(game, 0, 0, 'catalogue', sprites.ARROW);
        const rightArrow = new Phaser.Sprite(game, 0, 0, 'catalogue', sprites.ARROW);

        // background
        this.background = new Phaser.Graphics(game, 0, 0);

        // create left arrow from right arrow sprite
        leftArrow.rotation = Phaser.Math.degToRad(180);

        // set anchors for scaling from the center
        leftArrow.anchor.setTo(0.5);
        rightArrow.anchor.setTo(0.5);

        // product
        this.item = new Product(game, this.catalogue.getActiveProduct());

        // wrapper
        this.addChild(this.background);
        this.addChild(this.item);
        this.addChild(leftArrow);
        this.addChild(rightArrow);

        // background
        this.background.beginFill(0x0000ff);
        this.background.alpha = 0;
        this.background.drawRect(0, 0, game.width, game.height / 2);

        this.topPadding = 32;

        // carousel positioning
        this.x = game.world.centerX - (this.background.width / 2);
        this.y = 0;

        // arrow positioning
        const arrowPadding = 60;

        leftArrow.y = (this.background.height / 2) - (leftArrow.height / 2) + this.topPadding;
        leftArrow.x = (leftArrow.width / 2) + arrowPadding;
        rightArrow.y = (this.background.height / 2) - (rightArrow.height / 2) + this.topPadding;
        rightArrow.x = (this.background.width - (rightArrow.width / 2)) - arrowPadding;

        // product positioning
        this.item.x = (this.background.width / 2) - (this.item.getDimensions().width / 2);
        this.item.y = 16 + this.topPadding;

        // scale arrows up on keyDown
        game.input.keyboard.onDownCallback = () => {
            switch (game.input.keyboard.event.keyCode) {
                case Phaser.Keyboard.LEFT:
                    leftArrow.scale.setTo(this.arrowScale);
                    this.catalogue.prev();
                    break;
                case Phaser.Keyboard.RIGHT:
                    rightArrow.scale.setTo(this.arrowScale);
                    this.catalogue.next();
                    break;
                }

            this.item.updateProduct(this.catalogue.getActiveProduct());
        };

        // revert arrow scaling on keyUp
        game.input.keyboard.onUpCallback = () => {
            leftArrow.scale.setTo(1);
            rightArrow.scale.setTo(1);
        };
    }
}
