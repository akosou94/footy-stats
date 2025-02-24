import { action, makeObservable, observable, runInAction } from "mobx";
import { MatchesApi } from "../api/matchesApi";
import { Match } from "../api/matchesApi/types.ts";


export class MatchesStore {
	matches: Match[] = []

	constructor(private matchesApi: MatchesApi) {
		makeObservable(this, {
			matches: observable,
			loadMatches: action
		})
	}

	loadMatches() {
		this.matchesApi.getMatches().then(r => {
			runInAction(() => {
				this.matches = r.matches
				console.log('r.matches', r.matches);
			})
		})
	}
}