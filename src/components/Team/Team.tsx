import { List } from "@mantine/core";
import styles from "../Matches/Matches.module.scss";
import {
  getProbabilities,
  ratingAttackTeam,
} from "../Matches/utils/calculate.ts";
import { mappedLabels } from "../Matches/utils/statistics.ts";
import { TeamTableStatistics } from "../../api/matchesApi/types.ts";
import { FC } from "react";

interface TeamProps {
  matchesToday: any;
  isReadyAverageStatistics: boolean;
  averageStatistics: Record<string, Partial<TeamTableStatistics>>;
}

const Team: FC<TeamProps> = (props) => {
  const { matchesToday, isReadyAverageStatistics, averageStatistics } = props;

  return (
    <>
      {isReadyAverageStatistics &&
        matchesToday?.map((match) => {
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
    </>
  );
};

export default Team;
