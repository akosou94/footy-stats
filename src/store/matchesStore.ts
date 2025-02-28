import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { MatchesApi } from "../api/matchesApi";
import { Match, MatchInfoByYear } from "../api/matchesApi/types.ts";
import { matchesInfo } from "../components/Matches/types.ts";

export class MatchesStore {
  matches: Match[] = [];
  matchesInfoByYear: Record<string, MatchInfoByYear> = {};

  constructor(private matchesApi: MatchesApi) {
    makeObservable(this, {
      matches: observable,
      loadMatches: action,
      matchesInfoByYear: observable,
      loadMatchesInfoByCode: action.bound,
      matchesToday: computed,
    });
  }

  get matchesToday(): Record<string, matchesInfo> {
    return this.matches.reduce(
      (acc, match) => {
        if (!acc[match.competition.code]) {
          acc[match.competition.code] = {
            emblem: match.competition.emblem,
            matchDay: match.matchday,
            matches: [],
            competition: match.competition,
          };
        }

        acc[match.competition.code].matches.push({
          competition: {
            name: match.competition.name,
            code: match.competition.code,
          },
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          id: match.id,
        });

        return acc;
      },
      {} as Record<string, matchesInfo>,
    );
  }

  loadMatches(value) {
    this.matchesApi.getMatches(value).then((r) => {
      runInAction(() => {
        this.matches = r.matches;
      });
    });
  }

  loadMatchesInfoByCode(code: string) {
    if (this.matchesInfoByYear[code]) {
      return;
    }

    this.matchesApi.getMatchesDataByYear(code).then((r) => {
      runInAction(() => {
        this.matchesInfoByYear[code] = r;
      });
    });
  }
}
