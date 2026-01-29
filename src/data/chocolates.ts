import { Chocolate, BoxSize } from '@/types/chocolate';

export const chocolates: Chocolate[] = [
  {
    id: 'dark',
    name: 'Noir Intense',
    color: 'bg-chocolate-dark',
    price: 2.5,
    description: 'Rich 72% dark chocolate',
  },
  {
    id: 'milk',
    name: 'Lait Onctueux',
    color: 'bg-chocolate-milk',
    price: 2.0,
    description: 'Creamy milk chocolate',
  },
  {
    id: 'praline',
    name: 'Praliné Noisette',
    color: 'bg-chocolate-praline',
    price: 3.0,
    description: 'Hazelnut praline filling',
  },
  {
    id: 'caramel',
    name: 'Caramel Beurre Salé',
    color: 'bg-chocolate-caramel',
    price: 3.0,
    description: 'Salted butter caramel',
  },
  {
    id: 'raspberry',
    name: 'Framboise',
    color: 'bg-chocolate-raspberry',
    price: 3.5,
    description: 'Raspberry ganache',
  },
  {
    id: 'pistachio',
    name: 'Pistache',
    color: 'bg-chocolate-pistachio',
    price: 3.5,
    description: 'Sicilian pistachio cream',
  },
  {
    id: 'orange',
    name: 'Orange Confite',
    color: 'bg-chocolate-orange',
    price: 3.0,
    description: 'Candied orange peel',
  },
  {
    id: 'white',
    name: 'Blanc Vanille',
    color: 'bg-chocolate-white',
    price: 2.5,
    description: 'Madagascan vanilla white',
  },
];

export const boxSizes: BoxSize[] = [
  {
    id: 'petit',
    name: 'Le Petit',
    rows: 2,
    chocolatesPerRow: 3,
    price: 5.0,
  },
  {
    id: 'classique',
    name: 'Le Classique',
    rows: 3,
    chocolatesPerRow: 4,
    price: 8.0,
  },
  {
    id: 'prestige',
    name: 'Le Prestige',
    rows: 3,
    chocolatesPerRow: 6,
    price: 12.0,
  },
];
