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

export const stickerOrder = {
  [Sticker.White]: 1,
  [Sticker.Red]: 2,
  [Sticker.Green]: 3,
  [Sticker.Black]: 4,
  [Sticker.Blue]: 5,
  [Sticker.Purple]: 6,
  [Sticker.Orange]: 7,
  [Sticker.Gold]: 8,
};

export interface Joker {
  id: number;
  name: string;
  uri: string;
  sticker: Sticker | null;
  description: string;
}

export enum SortOptions {
  Default = 'Sort by',
  Id = 'Id',
  Alphanumeric = 'Alphabetically',
  StickersAsc = 'Stickers Asc',
  StickersDesc = 'Stickers Desc',
}
