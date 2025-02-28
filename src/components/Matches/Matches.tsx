import { observer } from "mobx-react-lite";
import { useMatchesStore } from "../../store/hooks";
import { useEffect, useState } from "react";
import { List, SegmentedControl } from "@mantine/core";
import styles from "./Matches.module.scss";
import { reaction } from "mobx";
import { options } from "./constants";
import { LeagueStore } from "./LeagueStore";
import { mappedLabels } from "./utils/statistics.ts";
import { getProbabilities, ratingAttackTeam } from "./utils/calculate.ts";
import { DatePicker } from "@mantine/dates";

export const Matches = observer(() => {
  const store = useMatchesStore();
  const [leagueStore] = useState(() => new LeagueStore(store));
  const matchesToday = leagueStore.matchesToday;
  const league = leagueStore.leagueInfo;
  const averageStatistics = leagueStore.averageStatistics;

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
          <div>
            <img
              className={styles.List__EmblemImage}
              src={league?.emblem}
              alt="Эмблема лиги"
            />
            <h2 className={styles.List__MatchDay}>{league?.matchDay}-й тур</h2>
          </div>
        )}
        {matchesToday?.map((match) => {
          const { id, homeTeam, awayTeam } = match;

          return (
            <List.Item key={id}>
              <div className={styles.List__TeamVsTeam}>
                <div className={styles.List__Team}>
                  <div className={styles.Title}>
                    <h3>Хозяева</h3>
                    <img
                      className={styles.List__TeamImage}
                      src={homeTeam.crest}
                      alt="Эмблема клуба хозяев"
                    />
                    <p>{homeTeam.shortName}</p>
                  </div>
                  <div>
                    <h4>Вероятность забитых голов:</h4>
                    {getProbabilities(
                      ratingAttackTeam(
                        averageStatistics[homeTeam.id].powerAttack,
                        averageStatistics[awayTeam.id].powerDefenceAway,
                        averageStatistics[homeTeam.id].leagueGoalsHome,
                      ),
                    ).map((item, index) => (
                      <p className={styles.List__ItemText}>
                        {index} - {item}%
                      </p>
                    ))}
                  </div>
                  <div>
                    <h4>Статистика команды:</h4>
                    <ul>
                      {Object.entries(averageStatistics[homeTeam.id]).map(
                        ([key, value]) => (
                          <li key={key} className={styles.List__ItemText}>
                            {mappedLabels[key]} - {value}
                          </li>
                        ),
                      )}
                    </ul>
                    <p className={styles.List__ItemText}>
                      Рейтинг атаки -{" "}
                      {ratingAttackTeam(
                        averageStatistics[homeTeam.id].powerAttack,
                        averageStatistics[awayTeam.id].powerDefenceAway,
                        averageStatistics[homeTeam.id].leagueGoalsHome,
                      )}
                    </p>
                  </div>
                </div>
                <div className={styles.List__Team}>
                  <div className={styles.Title}>
                    <h3>Гости</h3>
                    <img
                      className={styles.List__TeamImage}
                      src={awayTeam.crest}
                      alt="Эмблема клуба гостей"
                    />
                    <p>{awayTeam.shortName}</p>
                  </div>
                  <div>
                    <h4>Вероятность забитых голов:</h4>
                    {getProbabilities(
                      ratingAttackTeam(
                        averageStatistics[homeTeam.id].powerDefence,
                        averageStatistics[awayTeam.id].powerAttackAway,
                        averageStatistics[awayTeam.id].leagueGoalsHome,
                      ),
                    ).map((item, index) => (
                      <p className={styles.List__ItemText}>
                        {index} - {item}%
                      </p>
                    ))}
                  </div>
                  <div>
                    <h4>Статистика команды:</h4>
                    <ul>
                      {Object.entries(averageStatistics[awayTeam.id]).map(
                        ([key, value]) => (
                          <li key={key} className={styles.List__ItemText}>
                            {mappedLabels[key]} - {value}
                          </li>
                        ),
                      )}
                    </ul>
                    <p className={styles.List__ItemText}>
                      Рейтинг атаки -{" "}
                      {ratingAttackTeam(
                        averageStatistics[homeTeam.id].powerDefence,
                        averageStatistics[awayTeam.id].powerAttackAway,
                        averageStatistics[awayTeam.id].leagueGoalsHome,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
});
