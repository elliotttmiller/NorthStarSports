import { formatBetType } from '../betFormatters';
describe('formatBetType', () => {
  it('formats single bet', () => {
    expect(formatBetType('single')).toBe('Single Bet');
  });
  it('formats parlay bet', () => {
    expect(formatBetType('parlay')).toBe('Parlay');
  });
});
