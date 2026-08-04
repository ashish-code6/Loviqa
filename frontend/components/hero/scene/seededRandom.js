export function seededRandom(index, seed = 1) {
  const value = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function centeredRandom(index, seed = 1) {
  return seededRandom(index, seed) - 0.5;
}
