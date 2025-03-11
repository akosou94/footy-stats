import { action, computed, makeObservable, observable } from "mobx";
import { MatchesStore } from "../../store/matchesStore.ts";
import { StandingType, TeamTableItem } from "../../api/matchesApi/types.ts";
import { getAverageStatistics } from "./utils/statistics.ts";

export class LeagueStore {
  league = "PL";
  dateFrom: Date | null = new Date();
  dateTo: Date | null = new Date();

  setLeague(code: string) {
    this.league = code;
  }

  setDates([value1, value2]) {
    this.dateFrom = value1;
    this.dateTo = value2;
  }

  constructor(private matchesStore: MatchesStore) {
    makeObservable(this, {
      league: observable,
      dateFrom: observable,
      dateTo: observable,
      setLeague: action.bound,
      setDates: action.bound,
      leagueInfo: computed,
      matchesToday: computed,
      standings: computed,
      averageStatistics: computed,
      isReadyAverageStatistics: computed,
    });
  }

  get leagueInfo() {
    return this.matchesStore.matchesToday[this.league];
  }

  get matchesToday() {
    return this.matchesStore.matchesToday[this.league]?.matches;
  }

  get standings() {
    const league = this.matchesStore.matchesInfoByYear[this.league];

    if (!league) {
      return {};
    }

    const result = league.standings.reduce(
      (acc, item) => {
        item.table.forEach((tableItem) => {
          const key = tableItem.team.id;

          if (!acc[key]) {
            acc[key] = {} as Record<StandingType, TeamTableItem>;
          }

          acc[key] = {
            ...acc[key],
            [item.type]: tableItem,
          };
        });

        return acc;
      },
      {} as Record<string, Record<StandingType, TeamTableItem>>,
    );

    return result;
  }

  get averageStatistics() {
    return getAverageStatistics(this.standings);
  }

  get isReadyAverageStatistics() {
    return Boolean(Object.keys(this.averageStatistics).length);
  }
}
