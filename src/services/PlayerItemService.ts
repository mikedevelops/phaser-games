import { ProductInterface, CatalogueInterface } from '../interfaces/catalogue';
export default class PlayerItemService {
    private master: CatalogueInterface[];

    constructor (
        master: CatalogueInterface[]
    ) {
        // Create a clone of the master catalogue collection
        this.master = master.map((c: CatalogueInterface) => {
            return Object.assign({}, c);
        });

        // default unlocks
        // "The Everyday"
        this.master.find((c: CatalogueInterface) => c.id === 'INTRO')
            .items.find((p: ProductInterface) => p.id === 0)
            .locked = false;
    }

    public getItemsById (
        key: string
    ): CatalogueInterface {
        return this.master.find((c: CatalogueInterface) => c.id === key);
    }
}
