import { AxiosInstance } from "axios";
import { Match } from "./types.ts";


export interface MatchesApi {
	getMatches: () => Promise<{ matches: Match[] }>
}

export class AppMatchesApi implements MatchesApi {
	constructor(private httpService: AxiosInstance) {
	}

	getMatches() {
		return this.httpService.get('/v4/matches').then(r => r.data)
	}
}

// export function makeMatchesApi(httpService: AxiosInstance): MatchesApi {
// 	return {
// 		getMatches: () => {
// 			return httpService.get('/v4/matches').then(r => r.data)
// 		}
// 	}
// }