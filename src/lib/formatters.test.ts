import { formatOdds, formatCurrency } from '../../frontend/src/lib/formatters';

describe('formatOdds', () => {
  it('should format positive odds with a plus sign', () => {
    expect(formatOdds(300)).toBe('+300');
  });
  it('should format negative odds as-is', () => {
    expect(formatOdds(-110)).toBe('-110');
  });
});

describe('formatCurrency', () => {
  it('should format a number into a USD currency string', () => {
    expect(formatCurrency(25.5)).toBe('$25.50');
  });
});
