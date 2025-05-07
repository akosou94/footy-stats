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
import "dayjs/locale/ru";

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
      (code) => {
        store.loadMatchesInfoByCode(code);
      },
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
          withItemsBorders={false}
          transitionDuration={500}
          transitionTimingFunction="linear"
          styles={{
            root: {
              flexWrap: "wrap",
            },
          }}
        />
        <DatePicker
          type="range"
          value={[leagueStore.dateFrom, leagueStore.dateTo]}
          onChange={leagueStore.setDates}
          locale={"ru"}
        />
      </div>
      <List
        className={styles.List}
        styles={{
          root: {
            display: "flex",
            flex: "1",
            flexWrap: "wrap",
            gap: "10px",
          },
        }}
      >
        {!matchesToday && <p>На сегодня нет матчей в лиге</p>}
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
