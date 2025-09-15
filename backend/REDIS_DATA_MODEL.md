# Redis Data Model for NorthStarSports

## Key Patterns & Types

| Key Pattern                  | Type        | Purpose/Fields                                                                 |
|------------------------------|-------------|-------------------------------------------------------------------------------|
| user:{userId}                | Hash        | User profile: username, email, balance, etc.                                  |
| session:{sessionId}          | String      | UserId (for session management)                                               |
| betslip:{userId}:active      | String/JSON | Current bet slip (bets, type, totalStake, totalPayout, totalOdds)             |
| betslip:{userId}:history     | List        | List of betslip IDs (for bet history)                                         |
| bet:{betId}                  | String/JSON | Bet details: gameId, odds, stake, payout, type, selection, playerProp, status |
| game:{gameId}                | String/JSON | Game info: teams, odds, status, startTime, venue                              |
| playerprop:{propId}          | String/JSON | Player prop details: playerId, statType, line, odds, etc.                     |
| leaderboard:weekly           | Sorted Set  | userId -> score                                                               |
| leaderboard:alltime          | Sorted Set  | userId -> score                                                               |

## Usage Examples

- Set user profile:
  `HSET user:123 username "elliott" email "elliott@email.com" balance 1000`
- Store active bet slip:
  `SET betslip:123:active '{"bets":[...],"betType":"parlay",...}'`
- Add bet to history:
  `LPUSH betslip:123:history betslipId`
- Store bet details:
  `SET bet:bet123 '{...}'`
- Update leaderboard:
  `ZINCRBY leaderboard:weekly 100 123`

## Service Functions

See `src/services/kvService.js` for CRUD functions for each entity.

---

Update this file as your data model evolves.
