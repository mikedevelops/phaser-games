import { Catalogue, Product } from '../interfaces/catalogue';

export default class CatalogueService {
    private activeProductIndex: number = 0;

    constructor (
        private catalogue: Catalogue
    ) {}

    public getActiveProduct (): Product {
        return this.catalogue.products[this.activeProductIndex];
    }

    public getNextItem (): Product {
        if (this.activeProductIndex === this.catalogue.products.length - 1) {
            this.activeProductIndex = 0;
        } else {
            this.activeProductIndex++;
        }

        return this.catalogue.products[this.activeProductIndex];
    }

    public getPrevItem (): Product {
        if (this.activeProductIndex === 0) {
            this.activeProductIndex = this.catalogue.products.length - 1;
        } else {
            this.activeProductIndex--;
        }

        return this.catalogue.products[this.activeProductIndex];
    }

}
