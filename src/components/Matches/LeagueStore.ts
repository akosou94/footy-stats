import { action, makeObservable, observable } from "mobx";

export class LeagueStore {
	league = 'PL'

	setLeague(code: string) {
		this.league = code
	}

	constructor() {
		makeObservable(this, {
			league: observable,
			setLeague: action.bound
		})
	}
}