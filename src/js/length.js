const UNIT_PARAMS = {
  MM: 1,
  CM: 10,
  DM: 100,
  M: 1000,
};

export class Item {
  constructor(length, unit) {
    this.length = length;
    this.unit = unit;
    if (!this.getLengthInMm()) {
      throw new Error('Length must be number and unit must be mm, cm, dm or m.')
    }
  }

  getLengthInMm() {
    return this.length * UNIT_PARAMS[this.unit.toUpperCase()];
  }

  isLongerThan(item) {
    return this.getLengthInMm() > item.getLengthInMm();
  }
}

export const getLongerOne = (item1, item2) => {
  return item1.isLongerThan(item2) ? item1 : item2;
};
