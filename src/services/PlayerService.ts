import WalletService from './WalletService';
import PlayerItemService from './PlayerItemService';
import { CatalogueInterface } from '../interfaces/catalogue';

export default class PlayerService {
    constructor (
        private wallet: WalletService,
        private items: PlayerItemService,
        private name: string = 'Player 1',
    ) {}

    public getItemsById (
        key: string
    ): CatalogueInterface {
        return this.items.getItemsById(key);
    }
}
