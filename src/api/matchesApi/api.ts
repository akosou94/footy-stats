import { AxiosInstance } from "axios";
import { Match, MatchInfoByYear } from "./types.ts";


export interface MatchesApi {
	getMatches: () => Promise<{ matches: Match[] }>
	getMatchesDataByYear: (code: string) => Promise<MatchInfoByYear>
}

export class AppMatchesApi implements MatchesApi {
	season = '2024'

	constructor(private httpService: AxiosInstance) {
	}

	getMatches() {
		return this.httpService.get('/v4/matches').then(r => r.data)
	}

	getMatchesDataByYear(code: string = 'PL',) {
		return this.httpService.get(`/v4/competitions/${code}/standings`, {
			params: {
				season: this.season
			}
		}).then(r => r.data)
	}
}

// export function makeMatchesApi(httpService: AxiosInstance): MatchesApi {
// 	return {
// 		getMatches: () => {
// 			return httpService.get('/v4/matches').then(r => r.data)
// 		}
// 	}
// }