import { Catalogue } from '../../interfaces/catalogue';

const introStoreCatalogue: Catalogue = {
    name: 'Suits Plus',
    products: [
        {
            id: 0,
            price: 40,
            name: 'The Basic',
            description: 'The everyday suit.',
            sprite: 'suit_0',
            locked: false
        },
        {
            id: 1,
            price: 5.99,
            name: 'The Packet Shirt',
            description: 'Fresh out of the packet.',
            sprite: 'shirt_0',
            locked: false
        }
    ]
};

export default introStoreCatalogue;
