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
    expect(
      formatBetDescription({
        id: 'bet1',
        betType: 'spread',
        selection: 'home',
        gameId: 'game1',
  odds: -110,
        stake: 100,
        potentialPayout: 190,
        game: {
          id: 'game1',
          leagueId: 'nba',
          startTime: new Date('2024-06-01T19:00:00Z'),
          status: 'upcoming',
          odds: {
            spread: {
              home: { odds: -110, line: -5.5, lastUpdated: new Date() },
              away: { odds: +110, line: +5.5, lastUpdated: new Date() }
            },
            moneyline: {
              home: { odds: -200, lastUpdated: new Date() },
              away: { odds: +170, lastUpdated: new Date() }
            },
            total: {
              home: { odds: -110, lastUpdated: new Date() },
              away: { odds: +110, lastUpdated: new Date() },
              over: { odds: -110, line: 210.5, lastUpdated: new Date() },
              under: { odds: +110, line: 210.5, lastUpdated: new Date() }
            }
          },
          homeTeam: { id: '1', name: 'New York Knicks', shortName: 'NYK', logo: 'nyk.png' },
          awayTeam: { id: '2', name: 'Boston Celtics', shortName: 'BOS', logo: 'bos.png' }
        }
      })
    ).toContain('NYK');
  });
});
