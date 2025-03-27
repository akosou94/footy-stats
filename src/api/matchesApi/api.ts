import { AxiosInstance } from "axios";
import { Match, MatchInfoByYear } from "./types.ts";

export interface MatchesApi {
  getMatches: (value) => Promise<{ matches: Match[] }>;
  getMatchesDataByYear: (code: string) => Promise<MatchInfoByYear>;
}

export class AppMatchesApi implements MatchesApi {
  constructor(private httpService: AxiosInstance) {}

  getMatches(value: Date[]): Promise<{ matches: Match[] }> {
    const params: Record<string, string | null> = {};

    if (value[0]) {
      params.dateFrom = value[0].toISOString().split("T")[0];
    }
    if (value[1]) {
      params.dateTo = value[1].toISOString().split("T")[0];
    }

    return this.httpService
      .get("/matches", { params })
      .then((r) => r.data)
      .catch((error) => {
        console.error("Error fetching matches:", error);
        throw error;
      });
  }

  getMatchesDataByYear(code: string): Promise<MatchInfoByYear> {
    return this.httpService
      .get(`/matches/by-year`, {
        params: {
          code,
        },
      })
      .then((r) => r.data)
      .catch((error) => {
        console.error("Error fetching matches data by year:", error);
        throw error;
      });
  }
}
