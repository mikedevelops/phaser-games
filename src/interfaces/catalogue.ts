import { ItemInterface, CarouselInterface } from './Carousel';

export interface ProductInterface {
    id: number;
    price: number;
    name: string;
    description: string;
    sprite: string;
    locked: boolean;
}

export interface CatalogueInterface {
    id: string;
    name: string;
    items: ProductInterface[];
}
