export interface Chocolate {
  id: string;
  name: string;
  color: string;
  price: number;
  description: string;
}

export interface BoxSize {
  id: string;
  name: string;
  rows: number;
  chocolatesPerRow: number;
  price: number;
  weight: number;
  image?: string;
}

export interface PlacedChocolate {
  rowIndex: number;
  position: number;
  chocolate: Chocolate;
}

export type AppStep = 'intro' | 'box-selection' | 'customize' | 'message' | 'confirmation';
