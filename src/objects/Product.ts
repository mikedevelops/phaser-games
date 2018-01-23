import 'phaser-ce';
import { ProductInterface } from '../interfaces/catalogue';
import GameText from './GameText';

const sprites = {
    LOCKED: 'products 1.ase'
};

export default class Product extends Phaser.Sprite {
    private sprite: Phaser.Sprite;

    constructor (
        game: Phaser.Game,
        product: ProductInterface,
        private locked: boolean = true,
        x: number = 0,
        y: number = 0
    ) {
        super(game, x, y, null);

        this.sprite = new Phaser.Sprite(game, 0, 0, 'products', this.getSpriteFrame(product));

        this.addChild(this.sprite);
    }

    public getDimensions (): { width: number, height: number } {
        return {
            width: this.sprite.width,
            height: this.sprite.height
        };
    }

    public updateProduct (product: ProductInterface) {
        this.sprite.frameName = this.getSpriteFrame(product);
    }

    private getSpriteFrame (product: ProductInterface): string {
        return this.locked ? sprites.LOCKED : product.sprite;
    }
}
