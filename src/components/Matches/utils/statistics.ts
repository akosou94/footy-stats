import { avg } from "./calculate.ts";
import { StandingType, TeamTableItem, TeamTableStatistics } from "../../../api/matchesApi/types";

export const getAverageStatistics = (standings: Record<string, Record<StandingType, TeamTableItem>>) => {
	return Object.entries(standings).reduce((acc, [id, teamStanding]) => {
		if (!acc[id]) {
			acc[id] = {}
		}

		acc[id] = getStatistic(teamStanding)

		return acc
	}, {} as Record<string, Partial<TeamTableStatistics>>)
}

export const getStatistic = (teamStanding: Record<StandingType, TeamTableItem>) => {
	const playedGames = teamStanding.TOTAL.playedGames
	const goalsFor = teamStanding.TOTAL.goalsFor
	const goalsForHome = avg(teamStanding.HOME?.goalsFor, teamStanding.HOME?.playedGames)
	const goalsForAway = avg(teamStanding.AWAY?.goalsFor, teamStanding.AWAY?.playedGames)
	const leagueGoalsHome = avg(teamStanding?.TOTAL?.playedGames, teamStanding.TOTAL?.goalsFor)
	const missedGoalsAgainstHome = avg(teamStanding?.HOME?.goalsAgainst, teamStanding.HOME?.playedGames)
	const missedGoalsAgainstAway = avg(teamStanding?.AWAY?.goalsAgainst, teamStanding.AWAY?.playedGames)
	const missedGoalsAgainst = avg(teamStanding?.HOME?.goalsAgainst + teamStanding.AWAY?.goalsAgainst, teamStanding?.TOTAL?.playedGames)
	const powerAttack = Number((Number(goalsForHome) / Number(leagueGoalsHome)).toFixed(2))
	const powerDefence = Number((Number(missedGoalsAgainstHome) / Number(missedGoalsAgainst)).toFixed(2))
	const powerAttackAway = Number((Number(goalsForAway / Number(leagueGoalsHome)).toFixed(2)))
	const powerDefenceAway = Number((Number(missedGoalsAgainstAway) / Number(missedGoalsAgainst)).toFixed(2))

	return {
		playedGames,
		goalsFor,
		goalsForHome,
		goalsForAway,
		leagueGoalsHome,
		missedGoalsAgainstHome,
		missedGoalsAgainstAway,
		missedGoalsAgainst,
		powerAttack,
		powerDefence,
		powerAttackAway,
		powerDefenceAway
	}
}

export const mappedLabels: Record<string, string> = {
	'playedGames': 'Всего матчей',
	'goalsFor': 'Всего голов',
	'goalsForHome': 'Среднее забитых дома',
	'goalsForAway': 'Среднее забитых в гостях',
	'leagueGoalsHome': 'Среднее голов в лиге',
	'missedGoalsAgainstHome': 'Среднее пропущенных дома',
	'missedGoalsAgainstAway': 'Среднее пропущенных в гостях',
	'missedGoalsAgainst': 'Среднее пропущенных в лиге',
	'powerAttack': 'Сила атаки дома',
	'powerDefence': 'Сила обороны дома',
	'powerAttackAway': 'Сила атаки в гостях',
	'powerDefenceAway': 'Сила обороны в гостях',
	'ratingAttackTeam': 'Рейтинг Атаки Хозяев',
	'ratingAttackTeamAway': 'Рейтинг Атаки Гостей'
}

