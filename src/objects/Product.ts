import 'phaser-ce';
import { UserProductInterface } from '../interfaces/catalogue';
import GameText from './GameText';

const sprites = {
    LOCKED: 'products 1.ase'
};

export default class Product extends Phaser.Sprite {
    private sprite: Phaser.Sprite;

    constructor (
        game: Phaser.Game,
        product: UserProductInterface,
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

    public updateProduct (product: UserProductInterface) {
        this.sprite.frameName = this.getSpriteFrame(product);
    }

    private getSpriteFrame (product: UserProductInterface): string {
        return product.locked ? sprites.LOCKED : product.product.sprite;
    }
}
