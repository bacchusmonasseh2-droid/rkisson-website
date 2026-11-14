/**
 * Equipment available for rental.
 *
 * This list is intentionally EMPTY. The company's equipment inventory has not
 * been verified, so nothing is published until the company supplies it.
 *
 * TO ADD A MACHINE: add an entry like the commented example below and put its
 * photograph in src/assets/equipment/. The Equipment Rental page will switch
 * from the "enquire" notice to a catalogue automatically.
 */
export interface Equipment {
  name: string;
  /** File name in src/assets/equipment/, e.g. 'excavator-20t.jpg'. Must be a real photo of the unit. */
  photo?: string;
  description: string;
  specifications: { label: string; value: string }[];
  availability: 'Available' | 'On hire' | 'By arrangement';
}

export const equipment: Equipment[] = [
  // {
  //   name: 'Hydraulic excavator',
  //   photo: 'excavator-20t.jpg',
  //   description: 'Tracked excavator for trenching, canal work and general earthmoving.',
  //   specifications: [
  //     { label: 'Operating weight', value: '— t' },
  //     { label: 'Bucket capacity', value: '— m³' },
  //   ],
  //   availability: 'By arrangement',
  // },
];
