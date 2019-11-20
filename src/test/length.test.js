import { Item, getLongerOne } from '../js/length';

describe('Length', () => {
  it('should return item with longer length', () => {
    const item1 = new Item(0.13, 'm');
    const item2 = new Item(1, 'dm');
    expect(getLongerOne(item1, item2)).toBe(item1);
  });
});
