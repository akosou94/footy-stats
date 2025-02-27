import { avg } from "./calculate.ts";
import { StandingType, TeamTableItem, TeamTableStatistics } from "../../../api/matchesApi/types";

export const getAverageStatistics = (standings: Record<string, Record<StandingType, TeamTableItem>>) => {
	return Object.entries(standings).reduce((acc, [id, team]) => {
		if (!acc[id]) {
			acc[id] = {}
		}

		const goalsForHome = avg(team.HOME?.goalsFor, team.HOME?.playedGames)
		const goalsForAway = avg(team.AWAY?.goalsFor, team.AWAY?.playedGames)
		const leagueGoalsHome = avg(team?.TOTAL?.playedGames, team.TOTAL?.goalsFor)
		const missedGoalsAgainstHome = avg(team?.HOME?.goalsAgainst, team.HOME?.playedGames)
		const missedGoalsAgainstAway = avg(team?.AWAY?.goalsAgainst, team.AWAY?.playedGames)
		const missedGoalsAgainst = avg(team?.HOME?.goalsAgainst + team.AWAY?.goalsAgainst, team?.TOTAL?.playedGames)
		const powerAttack = Number((Number(goalsForHome) / Number(leagueGoalsHome)).toFixed(2))
		const powerDefence = Number((Number(missedGoalsAgainstHome) / Number(missedGoalsAgainst)).toFixed(2))


		acc[id] = {
			goalsForHome,
			goalsForAway,
			leagueGoalsHome,
			missedGoalsAgainstHome,
			missedGoalsAgainstAway,
			missedGoalsAgainst,
			powerAttack,
			powerDefence
		}

		return acc
	}, {} as Record<string, Partial<TeamTableStatistics>>)
}