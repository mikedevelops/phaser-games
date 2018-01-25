import WalletService from './WalletService';
import PlayerItemService from './PlayerItemService';
import { CatalogueInterface, UserCatalogueInterface, UserProductInterface } from '../interfaces/catalogue';

export default class PlayerService {
    constructor (
        private wallet: WalletService,
        private items: PlayerItemService,
        private name: string = 'Player 1',
    ) {}

    public getItemsById (
        key: string
    ): UserCatalogueInterface {
        return this.items.getItemsById(key);
    }

    public buyProduct (
        catalogueId: string,
        product: UserProductInterface
    ) {
        if (!product.locked && !product.owned) {
            this.items.purchase(catalogueId, product);
            this.wallet.subtract(product.product.price);
        }
    }

    public printWalletBalance (): string {
        return this.wallet.printBalance();
    }
}
