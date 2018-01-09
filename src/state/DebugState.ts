import 'phaser-ce';
import '../../assets/sheets/catalogue/catalogue.json';
import '../../assets/sheets/catalogue/catalogue.png';
import TextPane from '../objects/TextPane';
import CatalogueService from '../services/CatalogueService';
import introStoreCatalogue from '../data/catalogues/introCatalogue';

const sprites = {
    ARROW: 'catalogue.ase'
};

export default class DebugState extends Phaser.State {
    public preload (
        game: Phaser.Game
    ) {
        game.load.atlas('catalogue', 'catalogue.png', 'catalogue.json');
        game.load.atlas('pane', 'pane.png', 'pane.json');
    }

    public create (
        game: Phaser.Game
    ) {
        // carousel width
        const width = game.width / 1.5;

        // arrow interaction size
        const arrowScale = 1.5;
        const carousel = new Phaser.Sprite(game, 0, 0, null);
        const leftArrow = new Phaser.Sprite(game, 0, 0, 'catalogue', sprites.ARROW);
        const rightArrow = new Phaser.Sprite(game, 0, 0, 'catalogue', sprites.ARROW);

        // add sprites
        carousel.addChild(leftArrow);
        carousel.addChild(rightArrow);

        // create left arrow from right sprite
        leftArrow.rotation = Phaser.Math.degToRad(180);

        // set anchors for scaling from middle
        leftArrow.anchor.setTo(0.5);
        rightArrow.anchor.setTo(0.5);

        // center arrows at edges of carousel
        leftArrow.x = leftArrow.width / 2;
        rightArrow.x = width - (rightArrow.width / 2);

        // center carousel
        carousel.y = game.world.centerY - leftArrow.height;
        carousel.x = game.world.centerX - (width / 2);

        // catalogue
        const catalogue = new CatalogueService(introStoreCatalogue);

        // text pane
        const textPane = new TextPane(game, catalogue.getActiveProduct().name);

        // add object
        game.add.existing(carousel);
        game.add.existing(textPane);

        // scale arrows up on keyDown
        game.input.keyboard.onDownCallback = () => {
            switch (game.input.keyboard.event.keyCode) {
                case Phaser.Keyboard.LEFT:
                    leftArrow.scale.setTo(arrowScale);
                    textPane.updateText(catalogue.getPrevItem().name);
                    break;
                case Phaser.Keyboard.RIGHT:
                    rightArrow.scale.setTo(arrowScale);
                    textPane.updateText(catalogue.getNextItem().name);
                    break;
            }
        };

        // revert arrow scaling on keyUp
        game.input.keyboard.onUpCallback = () => {
            leftArrow.scale.setTo(1);
            rightArrow.scale.setTo(1);
        };
    }

    public update (
        game: Phaser.Game
    ) {}
}
