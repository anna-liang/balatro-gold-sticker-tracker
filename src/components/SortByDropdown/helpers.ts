import { Joker, SortOptions, stickerOrder } from 'types';

export const sortByHelper = ({
  jokerProgress,
  option,
}: {
  jokerProgress: Joker[];
  option: SortOptions;
}) => {
  let sortedResult = jokerProgress;
  switch (option) {
    case SortOptions.Id:
      sortedResult.sort((a, b) => {
        return a.id - b.id;
      });
      break;
    case SortOptions.Alphanumeric:
      sortedResult.sort((a, b) => {
        if (a.name < b.name) return -1;
        else return 1;
      });
      break;
    case SortOptions.StickersAsc:
      const jokersWithNoStickersAsc = sortedResult.filter(
        (joker) => joker.sticker === null,
      );
      const jokersWithStickersAsc = sortedResult.filter(
        (joker) => joker.sticker !== null,
      );
      jokersWithStickersAsc.sort((a, b) => {
        if (a.sticker && b.sticker)
          return stickerOrder[a.sticker] - stickerOrder[b.sticker];
        return 0;
      });
      sortedResult = jokersWithNoStickersAsc.concat(jokersWithStickersAsc);
      break;
    case SortOptions.StickersDesc:
      const jokersWithNoStickersDesc = sortedResult.filter(
        (joker) => joker.sticker === null,
      );
      const jokersWithStickersDesc = sortedResult.filter(
        (joker) => joker.sticker !== null,
      );
      jokersWithStickersDesc.sort((a, b) => {
        if (a.sticker && b.sticker)
          return stickerOrder[b.sticker] - stickerOrder[a.sticker];
        return 0;
      });
      sortedResult = jokersWithStickersDesc.concat(jokersWithNoStickersDesc);
      break;
    default:
      break;
  }
  return sortedResult;
};
