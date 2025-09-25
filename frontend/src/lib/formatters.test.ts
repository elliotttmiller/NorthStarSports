import { formatOdds, formatCurrency } from './formatters';

describe('formatOdds', () => {
  it('should correctly format positive odds with a plus sign', () => {
    expect(formatOdds(250)).toBe('+250');
  });

  it('should correctly format negative odds with a minus sign', () => {
    expect(formatOdds(-110)).toBe('-110');
  });
});

describe('formatCurrency', () => {
  it('should format a number into a USD currency string with two decimal places', () => {
    expect(formatCurrency(50)).toBe('$50.00');
    expect(formatCurrency(123.45)).toBe('$123.45');
  });
});
