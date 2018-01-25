import {
    CatalogueInterface,
    ProductInterface,
    UserProductInterface,
    UserCatalogueInterface
} from '../interfaces/catalogue';

export default class CatalogueService {
    private activeProductIndex: number = 0;

    constructor (
        private catalogue: UserCatalogueInterface
    ) {}

    public getActiveProduct (): UserProductInterface {
        return this.catalogue.products[this.activeProductIndex];
    }

    public next (): void {
        if (this.activeProductIndex === this.catalogue.products.length - 1) {
            this.activeProductIndex = 0;
        } else {
            this.activeProductIndex++;
        }
    }

    public prev (): void {
        if (this.activeProductIndex === 0) {
            this.activeProductIndex = this.catalogue.products.length - 1;
        } else {
            this.activeProductIndex--;
        }
    }

    public printActiveProduct (): string {
        const { name, description, price } = this.catalogue.products[this.activeProductIndex].product;

        return `${name}\n"${description}"`;
    }

    public printActiveProductPrice (): string {
        const { locked, owned } = this.catalogue.products[this.activeProductIndex];
        const { price } = this.catalogue.products[this.activeProductIndex].product;

        return `$${locked ? '???' : price.toFixed(2)}${owned ? ' (OWNED)' : ''}`;
    }

}
