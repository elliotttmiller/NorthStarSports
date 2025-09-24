import { formatOdds, formatBetDescription } from '../formatters';
describe('formatOdds', () => {
  it('formats positive odds', () => {
    expect(formatOdds(150)).toBe('+150');
  });
  it('formats negative odds', () => {
    expect(formatOdds(-120)).toBe('-120');
  });
});
describe('formatBetDescription', () => {
  it('returns correct description', () => {
    expect(formatBetDescription({ selection: 'home', game: { homeTeam: { shortName: 'NYK' }, awayTeam: { shortName: 'BOS' } } })).toContain('NYK');
  });
});
