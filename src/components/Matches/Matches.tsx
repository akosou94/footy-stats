import { observer } from "mobx-react-lite";
import { useMatchesStore } from "../../store/hooks";
import { useEffect, useState } from "react";
import { List, SegmentedControl } from "@mantine/core";
import styles from './Matches.module.scss'
import { computed, reaction, toJS } from "mobx";
import { options } from "./constants";
import { LeagueStore } from "./LeagueStore";
import { matchesInfo } from "./types";


export const Matches = observer(() => {
	const store = useMatchesStore()
	const [leagueStore] = useState(() => new LeagueStore())
	const standings = computed(() => {
		const total = store.matchesInfoByYear[leagueStore.league]

		if (!total) {
			return {}
		}

		return {
			[total?.standings[0]?.type]: total?.standings[0]?.table,
			[total?.standings[1]?.type]: total?.standings[1]?.table,
			[total?.standings[2]?.type]: total?.standings[2]?.table
		}
	}).get()

	// В глобальный стор в геттер/computed
	const newLeagues = store?.matches.reduce((acc, match) => {
		if (!acc[match.competition.code]) {
			acc[match.competition.code] = {
				id: undefined,
				emblem: '',
				matchDay: undefined,
				matches: []
			};
		}

		acc[match.competition.code].emblem = match.competition.emblem
		acc[match.competition.code].matches.push({
			competition: {
				name: match.competition.name,
				code: match.competition.code,
			},
			homeTeam: { ...match.homeTeam },
			awayTeam: { ...match.awayTeam },
			id: match.id,

		});
		acc[match.competition.code].matchDay = match.matchday


		return acc;
	}, {} as Record<string, matchesInfo>);


	useEffect(() => {
		store.loadMatches()
	}, [])

	useEffect(() => {
		const disposer = reaction(() => leagueStore.league, (code) => store.loadMatchesInfoByCode(code), { fireImmediately: true })

		return () => {
			disposer()
		}
	}, [])


	console.log('standings', standings);
	console.log('mobx js', toJS(store.matchesInfoByYear));

	return (
		<div className={styles.Matches}>
			<SegmentedControl
				value={leagueStore.league}
				onChange={leagueStore.setLeague}
				radius='md'
				data={options}
			/>
			<List className={styles.List}>
				<div>
					<img className={styles.List__EmblemImage} src={newLeagues[leagueStore.league]?.emblem} alt="Эмблема лиги"/>
					<p className={styles.List__MatchDay}>{newLeagues[leagueStore.league]?.matchDay}-й тур</p>
				</div>
				{newLeagues[leagueStore.league]?.matches?.map(({ id, homeTeam, awayTeam }) => {
					return <List.Item key={id}>
						<div className={styles.List__TeamVsTeam}>
							<div className={styles.List__Team}>
								<img className={styles.List__TeamImage} src={homeTeam.crest} alt="Эмблема клуба хозяев"/>
								<p>{homeTeam.shortName}</p>
							</div>
							<div className={styles.List__Team}>
								<img className={styles.List__TeamImage} src={awayTeam.crest} alt="Эмблема клуба гостей"/>
								<p>{awayTeam.shortName}</p>
							</div>
						</div>
					</List.Item>
				})}
			</List>
		</div>
	)
})
