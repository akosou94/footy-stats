import { AxiosInstance } from "axios";
import { Match, MatchInfoByYear } from "./types.ts";

export interface MatchesApi {
  getMatches: (value) => Promise<{ matches: Match[] }>;
  getMatchesDataByYear: (code: string) => Promise<MatchInfoByYear>;
}

export class AppMatchesApi implements MatchesApi {
  season = "2024";

  constructor(private httpService: AxiosInstance) {}

  getMatches(value) {
    return this.httpService
      .get("/v4/matches", {
        params: {
          dateFrom: value[0] ? value[0].toISOString().split("T")[0] : null,
          dateTo: value[1] ? value[1].toISOString().split("T")[0] : null,
          permission: "TIER_THREE",
        },
      })
      .then((r) => r.data);
  }

  getMatchesDataByYear(code: string = "PL") {
    return this.httpService
      .get(`/v4/competitions/${code}/standings`, {
        params: {
          season: this.season,
        },
      })
      .then((r) => r.data);
  }
}

// export function makeMatchesApi(httpService: AxiosInstance): MatchesApi {
// 	return {
// 		getMatches: () => {
// 			return httpService.get('/v4/matches').then(r => r.data)
// 		}
// 	}
// }
