import { CatalogueInterface, ProductInterface } from '../interfaces/catalogue';

export default class CatalogueService {
    private activeProductIndex: number = 0;

    constructor (
        private catalogue: CatalogueInterface
    ) {}

    public getActiveProduct (): ProductInterface {
        return this.catalogue.items[this.activeProductIndex];
    }

    public next (): void {
        if (this.activeProductIndex === this.catalogue.items.length - 1) {
            this.activeProductIndex = 0;
        } else {
            this.activeProductIndex++;
        }
    }

    public prev (): void {
        if (this.activeProductIndex === 0) {
            this.activeProductIndex = this.catalogue.items.length - 1;
        } else {
            this.activeProductIndex--;
        }
    }

    public printActiveProduct (): string {
        const { name, description, price } = this.catalogue.items[this.activeProductIndex];

        return `${name}\n"${description}"`;
    }

    public printActiveProductPrice (): string {
        const { locked, price } = this.catalogue.items[this.activeProductIndex];

        return `$${locked ? '???' : price.toFixed(2)}`;
    }

}
