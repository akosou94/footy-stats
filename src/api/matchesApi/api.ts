import { AxiosInstance } from "axios";
import { Match, MatchInfoByYear } from "./types.ts";


export interface MatchesApi {
	getMatches: () => Promise<{ matches: Match[] }>
	getMatchesDataByYear: (code: string, year: string) => Promise<MatchInfoByYear>
}

export class AppMatchesApi implements MatchesApi {
	constructor(private httpService: AxiosInstance) {
	}

	getMatches() {
		return this.httpService.get('/v4/matches').then(r => r.data)
	}

	getMatchesDataByYear(code: string = 'PL', year: string) {
		return this.httpService.get(`/v4/competitions/${code}/standings`, {
			params: {
				season: year,
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