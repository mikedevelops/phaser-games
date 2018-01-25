import { ItemInterface, CarouselInterface } from './Carousel';

export interface ProductInterface {
    id: number;
    price: number;
    name: string;
    description: string;
    sprite: string;
}

export interface CatalogueInterface {
    id: string;
    name: string;
    products: ProductInterface[];
}

export interface UserCatalogueInterface {
    id: string;
    name: string;
    products: UserProductInterface[];
}

export interface UserProductInterface {
    product: ProductInterface;
    locked: boolean;
    owned: boolean;
}
