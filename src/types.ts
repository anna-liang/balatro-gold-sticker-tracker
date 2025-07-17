export enum Sticker {
  White = 'white',
  Red = 'red',
  Green = 'green',
  Black = 'black',
  Blue = 'blue',
  Purple = 'purple',
  Orange = 'orange',
  Gold = 'gold',
}

export interface Joker {
  id: number;
  name: string;
  uri: string;
  sticker: Sticker | null;
  description: string;
}

interface JokerProgressProperties {
  name: string;
  uri: string;
  sticker: Sticker | null;
  description: string;
}

export interface JokerProgress {
  [key: string]: JokerProgressProperties;
}
