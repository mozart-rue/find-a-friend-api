export class CityNotFilterError extends Error {
  constructor() {
    super("Empty value to filter 'city' it must be filter.");
  }
}
