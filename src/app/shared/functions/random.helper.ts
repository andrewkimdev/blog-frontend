export const getRandomNumberBetween = (lowerInclusive: number, upperExclusive: number) =>
  Math.floor(Math.random() * (upperExclusive - lowerInclusive) + lowerInclusive);
