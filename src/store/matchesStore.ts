import { action, makeObservable, observable, runInAction } from "mobx";
import { MatchesApi } from "../api/matchesApi";
import { Match, MatchInfoByYear } from "../api/matchesApi/types.ts";


export class MatchesStore {
	matches: Match[] = []
	matchesInfoByYear: MatchInfoByYear = {
		filters: {
			season: ''
		},
		season: {
			id: undefined!,
			currentMatchday: 0,
			endDate: '',
			startDate: '',
			winner: null!
		},
		standings: []
	}

	constructor(private matchesApi: MatchesApi) {
		makeObservable(this, {
			matches: observable,
			loadMatches: action,
			matchesInfoByYear: observable,
			loadMatchesInfoByYear: action
		})
	}

	loadMatches() {
		this.matchesApi.getMatches().then(r => {
			runInAction(() => {
				this.matches = r.matches
			})
		})
	}

	loadMatchesInfoByYear(code: string, year: string) {
		this.matchesApi.getMatchesDataByYear(code, year).then(r => {
			runInAction(() => {
				this.matchesInfoByYear = r
			})
		})
	}
}