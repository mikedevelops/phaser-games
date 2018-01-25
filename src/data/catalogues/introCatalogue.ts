import { CatalogueInterface } from '../../interfaces/catalogue';

const introStoreCatalogue: CatalogueInterface = {
    id: 'INTRO',
    name: 'Suits Plus',
    products: [
        {
            id: 0,
            price: 5.99,
            name: 'The Everyday',
            description: 'The everyday suit, for everyday.',
            sprite: 'products 0.ase'
        },
        {
            id: 1,
            price: 40,
            name: 'The Penguin',
            description: 'Stay classy.',
            sprite: 'products 0.ase'
        }
    ]
};

export default introStoreCatalogue;
