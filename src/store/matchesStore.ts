import { action, makeObservable, observable, runInAction } from "mobx";
import { MatchesApi } from "../api/matchesApi";
import { Match, MatchInfoByYear } from "../api/matchesApi/types.ts";


export class MatchesStore {
	matches: Match[] = []
	matchesInfoByYear: Record<string, MatchInfoByYear> = {}

	constructor(private matchesApi: MatchesApi) {
		makeObservable(this, {
			matches: observable,
			loadMatches: action,
			matchesInfoByYear: observable,
			loadMatchesInfoByCode: action.bound,
		})
	}

	loadMatches() {
		this.matchesApi.getMatches().then(r => {
			runInAction(() => {
				this.matches = r.matches
			})
		})
	}

	loadMatchesInfoByCode(code: string) {
		if (this.matchesInfoByYear[code]) {
			return
		}

		this.matchesApi.getMatchesDataByYear(code).then(r => {
			runInAction(() => {
				this.matchesInfoByYear[code] = r
			})
		})
	}
}