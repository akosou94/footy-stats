import { observer } from "mobx-react-lite";
import { useMatchesStore } from "../../store/hooks.ts";
import { useEffect, useState } from "react";
import { List, SegmentedControl } from "@mantine/core";
import styles from './Matches.module.scss'
import { Team } from "../../api/matchesApi/types.ts";

interface matchesInfo {
	id?: number,
	emblem: string,
	matchDay?: number,
	matches: Array<{
		competition: {
			name: string,
			code: string,
		},
		homeTeam: Team,
		awayTeam: Team,
		id: number
	}>
}

const options = [
	{ label: "Premier League", value: "PL" },
	{ label: "Championship", value: "ELC" },
]

export const Matches = observer(() => {
	const [value, setValue] = useState('PL');
	const store = useMatchesStore()

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

	const total = store.matchesInfoByYear

	console.log('total', total);

	useEffect(() => {
		store.loadMatches()
	}, [])

	useEffect(() => {
		store.loadMatchesInfoByYear(value, '2024')
	}, [value])

	return (
		<div className={styles.Matches}>
			<SegmentedControl
				value={value}
				onChange={setValue}
				radius='md'
				data={options}
			/>
			<List className={styles.List}>
				<div>
					<img className={styles.List__EmblemImage} src={newLeagues[value]?.emblem} alt="Эмблема лиги"/>
					<p className={styles.List__MatchDay}>{newLeagues[value]?.matchDay}-й тур</p>
				</div>
				{newLeagues[value]?.matches?.map(({ id, homeTeam, awayTeam }) => {
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
