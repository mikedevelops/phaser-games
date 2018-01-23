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
    private item: Product;
    private catalogue: CatalogueService;

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
        const background = new Phaser.Graphics(game, 0, 0);

        // create left arrow from right arrow sprite
        leftArrow.rotation = Phaser.Math.degToRad(180);

        // set anchors for scaling from the center
        leftArrow.anchor.setTo(0.5);
        rightArrow.anchor.setTo(0.5);

        // product
        this.item = new Product(game, this.catalogue.getActiveProduct());

        // wrapper
        this.addChild(background);
        this.addChild(this.item);
        this.addChild(leftArrow);
        this.addChild(rightArrow);

        // background
        background.beginFill(0x0000ff);
        background.alpha = 0;
        background.drawRect(0, 0, game.width / 1.5, game.height / 2);

        // carousel positioning
        this.x = game.world.centerX - (background.width / 2);
        this.y = 25;

        // arrow positioning
        leftArrow.y = (background.height / 2) - (leftArrow.height / 2);
        leftArrow.x = leftArrow.width / 2;
        rightArrow.y = leftArrow.y = (background.height / 2) - (rightArrow.height / 2);
        rightArrow.x = background.width - rightArrow.width;

        // product positioning
        this.item.x = (background.width / 2) - (this.item.getDimensions().width / 2);
        this.item.y = 16;

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
        };

        // revert arrow scaling on keyUp
        game.input.keyboard.onUpCallback = () => {
            leftArrow.scale.setTo(1);
            rightArrow.scale.setTo(1);
        };
    }

    public update () {
        // update active product
        this.item.updateProduct(this.catalogue.getActiveProduct());
    }
}
