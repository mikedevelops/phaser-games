export interface Product {
    id: number;
    price: number;
    name: string;
    description: string;
    sprite: string;
    locked: boolean;

}

export interface Catalogue {
    name: string;
    products: Product[];
}
