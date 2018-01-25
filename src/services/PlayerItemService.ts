import {
    ProductInterface,
    CatalogueInterface,
    UserCatalogueInterface,
    UserProductInterface
} from '../interfaces/catalogue';

export default class PlayerItemService {
    private master: UserCatalogueInterface[];

    constructor (
        master: CatalogueInterface[]
    ) {
        // Create a recursive clone of the master catalogue collection
        this.master = master.map((c: CatalogueInterface) => {
            return Object.assign({}, c, {
                products: c.products.map((p: ProductInterface) => {
                    return {
                        product: Object.assign({}, p),
                        locked: true,
                        owned: false
                    };
                })
            });
        });

        // default unlocks
        // "The Everyday"
        this.master.find((c: UserCatalogueInterface) => c.id === 'INTRO')
            .products.find((p: UserProductInterface) => p.product.id === 0)
            .locked = false;
    }

    public getItemsById (
        key: string
    ): UserCatalogueInterface {
        return this.master.find((c: UserCatalogueInterface) => c.id === key);
    }
}
