import { observer } from "mobx-react-lite";
import { useMatchesStore } from "../../store/hooks";
import { useEffect, useState } from "react";
import { List, Loader, SegmentedControl } from "@mantine/core";
import styles from "./Matches.module.scss";
import { reaction } from "mobx";
import { options } from "./constants";
import { LeagueStore } from "./LeagueStore";
import { DatePicker } from "@mantine/dates";
import MatchesToday from "../MatchesToday/MatchesToday.tsx";

export const Matches = observer(() => {
  const store = useMatchesStore();
  const [leagueStore] = useState(() => new LeagueStore(store));
  const isReadyAverageStatistics = leagueStore.isReadyAverageStatistics;
  const averageStatistics = leagueStore.averageStatistics;
  const matchesToday = leagueStore.matchesToday;
  const league = leagueStore.leagueInfo;
  const loading = store.isLoadingMatches;

  useEffect(() => {
    const disposerLeague = reaction(
      () => leagueStore.league,
      (code) => store.loadMatchesInfoByCode(code),
      { fireImmediately: true },
    );

    const disposerDates = reaction(
      () => [leagueStore.dateFrom, leagueStore.dateTo],
      () => {
        if (leagueStore.dateFrom && leagueStore.dateTo)
          store.loadMatches([leagueStore.dateFrom, leagueStore.dateTo]);
      },
      { fireImmediately: true },
    );

    return () => {
      disposerLeague();
      disposerDates();
    };
  }, []);

  return (
    <div className={styles.Matches}>
      <div className={styles.Filters}>
        <SegmentedControl
          value={leagueStore.league}
          onChange={leagueStore.setLeague}
          radius="md"
          data={options}
        />
        <DatePicker
          type="range"
          value={[leagueStore.dateFrom, leagueStore.dateTo]}
          onChange={leagueStore.setDates}
        />
      </div>
      <List className={styles.List}>
        {!matchesToday ? (
          <p>На сегодня нет матчей в лиге</p>
        ) : (
          <div className={styles.List__League}>
            <img
              className={styles.List__Emblem}
              src={league?.emblem}
              alt="Эмблема лиги"
            />
            <h2 className={styles.List__MatchDay}>{league?.matchDay}-й тур</h2>
          </div>
        )}
        {loading ? (
          <Loader color="deepRed.9" />
        ) : (
          <MatchesToday
            matches={matchesToday}
            isReady={isReadyAverageStatistics}
            statistics={averageStatistics}
          />
        )}
      </List>
    </div>
  );
});
