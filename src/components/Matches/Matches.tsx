import { observer } from "mobx-react-lite";
import { useMatchesStore } from "../../store/hooks";
import { useEffect, useState } from "react";
import { List, SegmentedControl } from "@mantine/core";
import styles from './Matches.module.scss'
import { computed, reaction } from "mobx";
import { options } from "./constants";
import { LeagueStore } from "./LeagueStore";
import { StandingType, TeamTableItem } from "../../api/matchesApi/types.ts";
import { getAverageStatistics, mappedLabels } from "./utils/statistics.ts";

export const Matches = observer(() => {
	const store = useMatchesStore()
	const [leagueStore] = useState(() => new LeagueStore())
	const league = store.matchesToday[leagueStore.league]
	const matchesToday = league?.matches

	const standings = computed(() => {
		const league = store.matchesInfoByYear[leagueStore.league]

		if (!league) {
			return {}
		}

		const result = league.standings.reduce((acc, item) => {
			item.table.forEach((tableItem) => {
				const key = tableItem.team.id

				if (!acc[key]) {
					acc[key] = {} as Record<StandingType, TeamTableItem>
				}

				acc[key] = {
					...acc[key],
					[item.type]: tableItem
				}
			})

			return acc
		}, {} as Record<string, Record<StandingType, TeamTableItem>>)

		return result
	}).get()

	const averageStatistics = computed(() => {
		return getAverageStatistics(standings)
	}).get()

	console.group();
	console.log('standings', standings);
	console.log('averageStatistics', averageStatistics);
	console.groupEnd();

	useEffect(() => {
		store.loadMatches()
	}, [])

	useEffect(() => {
		const disposer = reaction(() => leagueStore.league, (code) => store.loadMatchesInfoByCode(code), { fireImmediately: true })

		return () => {
			disposer()
		}
	}, [])

	return (
		<div className={styles.Matches}>
			<SegmentedControl
				value={leagueStore.league}
				onChange={leagueStore.setLeague}
				radius='md'
				data={options}
			/>
			<List className={styles.List}>
				{!matchesToday ? (
					<p>На сегодня нет матчей в лиге</p>
				) : (
					<div>
						<img className={styles.List__EmblemImage} src={league?.emblem}
								 alt="Эмблема лиги"/>
						<p className={styles.List__MatchDay}>{league?.matchDay}-й тур</p>
					</div>
				)
				}
				{matchesToday?.map((match) => {
					const { id, homeTeam, awayTeam } = match

					return <List.Item key={id}>
						<div className={styles.List__TeamVsTeam}>
							<div className={styles.List__Team}>
								<img className={styles.List__TeamImage} src={homeTeam.crest} alt="Эмблема клуба хозяев"/>
								<p>{homeTeam.shortName}</p>
								<ul>
									{Object.entries(averageStatistics[homeTeam.id]).map(([key, value]) => (
										<li key={key}>{mappedLabels[key]} - {value}</li>
									))}
								</ul>
							</div>
							<div className={styles.List__Team}>
								<img className={styles.List__TeamImage} src={awayTeam.crest} alt="Эмблема клуба гостей"/>
								<p>{awayTeam.shortName}</p>
								<ul>
									{Object.entries(averageStatistics[awayTeam.id]).map(([key, value]) => (
										<li key={key}>{mappedLabels[key]} - {value}</li>
									))}
								</ul>
							</div>
						</div>
					</List.Item>
				})}
			</List>
		</div>
	)
})
