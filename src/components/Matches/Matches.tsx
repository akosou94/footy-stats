import { observer } from "mobx-react-lite";
import { useMatchesStore } from "../../store/hooks.ts";
import { useEffect } from "react";
import { List } from "@mantine/core";
import styles from './Matches.module.scss'

export const Matches = observer(() => {
	const store = useMatchesStore()

	useEffect(() => {
		store.loadMatches()
	}, [])

	return (
		<div>
			<List className={styles.List}>
				{store.matches.map(match => {
					return <List.Item key={match.id}>
						<div className={styles.List__Teams}>
							<img className={styles.List__Image} src={match.competition.emblem} alt="Эмблема лиги"/>
							<div className={styles.List__TeamVsTeam}>
								{match.homeTeam.name && match.awayTeam.name && <p>{match.competition.name}</p>}
								<p>{match.homeTeam.shortName} - {match.awayTeam.shortName}</p>
							</div>
						</div>
					</List.Item>
				})}
			</List>
		</div>
	)
})
