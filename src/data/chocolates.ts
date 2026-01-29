import { Chocolate, BoxSize } from '@/types/chocolate';

export const chocolates: Chocolate[] = [
  {
    id: 'dark',
    name: 'Noir Intense',
    color: 'bg-chocolate-dark',
    price: 2.5,
    description: 'Chocolat noir 72% cacao origine Ghana',
  },
  {
    id: 'milk',
    name: 'Lait Onctueux',
    color: 'bg-chocolate-milk',
    price: 2.0,
    description: 'Chocolat au lait crémeux et fondant',
  },
  {
    id: 'praline',
    name: 'Praliné Noisette',
    color: 'bg-chocolate-praline',
    price: 3.0,
    description: 'Praliné aux noisettes du Piémont',
  },
  {
    id: 'caramel',
    name: 'Caramel Beurre Salé',
    color: 'bg-chocolate-caramel',
    price: 3.0,
    description: 'Caramel au beurre salé de Guérande',
  },
  {
    id: 'raspberry',
    name: 'Framboise',
    color: 'bg-chocolate-raspberry',
    price: 3.5,
    description: 'Ganache framboise et chocolat noir',
  },
  {
    id: 'pistachio',
    name: 'Pistache',
    color: 'bg-chocolate-pistachio',
    price: 3.5,
    description: 'Crème de pistache de Sicile',
  },
  {
    id: 'orange',
    name: 'Orange Confite',
    color: 'bg-chocolate-orange',
    price: 3.0,
    description: 'Écorce d\'orange confite et chocolat',
  },
  {
    id: 'white',
    name: 'Blanc Vanille',
    color: 'bg-chocolate-white',
    price: 2.5,
    description: 'Chocolat blanc vanille de Madagascar',
  },
];

export const boxSizes: BoxSize[] = [
  {
    id: 'petit',
    name: 'Le Petit Plaisir',
    rows: 2,
    chocolatesPerRow: 3,
    price: 125.0,
    weight: 250,
  },
  {
    id: 'classique',
    name: 'Le Classique',
    rows: 3,
    chocolatesPerRow: 4,
    price: 195.0,
    weight: 500,
  },
  {
    id: 'prestige',
    name: 'Le Prestige',
    rows: 3,
    chocolatesPerRow: 6,
    price: 320.0,
    weight: 1000,
  },
];
