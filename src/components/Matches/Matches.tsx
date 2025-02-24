import { observer } from "mobx-react-lite";
import { useMatchesStore } from "../../store/hooks.ts";
import { useEffect } from "react";
import styles from './Matches.module.scss'

export const Matches = observer(() => {
	const store = useMatchesStore()

	useEffect(() => {
		store.loadMatches()
	}, [])

	return (
		<ul className={styles.List}>
			{store.matches.map(match => {
				return <li key={match.id} className={styles.List__Item}>
					<img className={styles.List__Image} src={match.competition.emblem} alt="Эмблема лиги"/>
					<div className={styles.List__Teams}>
						{match.homeTeam.name && match.awayTeam.name && <p>{match.competition.name}</p>}
						<p>{match.homeTeam.shortName} - {match.awayTeam.shortName}</p>
					</div>
				</li>
			})}
		</ul>
	)
})
