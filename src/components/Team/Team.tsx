import { List } from "@mantine/core";
import styles from "../Matches/Matches.module.scss";
import {
  getProbabilities,
  ratingAttackTeam,
} from "../Matches/utils/calculate.ts";
import { mappedLabels } from "../Matches/utils/statistics.ts";
import { TeamTableStatistics } from "../../api/matchesApi/types.ts";
import { FC } from "react";
import { Team as TeamType } from "../../api/matchesApi/types.ts";

interface TeamProps {
  matches:{
    competition: {
        name: string;
        code: string;
    };
    homeTeam: TeamType;
    awayTeam: TeamType;
    id: number;
}[] ;
  isReady: boolean;
  statistics: Record<string, Partial<TeamTableStatistics>>;
}

const Team: FC<TeamProps> = (props) => {
  const { matches, isReady, statistics } = props;

  return (
    <>
      {isReady &&
        matches?.map((match) => {
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
                        statistics[homeTeam.id].powerAttack,
                        statistics[awayTeam.id].powerDefenceAway,
                        statistics[homeTeam.id].leagueGoalsHome,
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
                      {Object.entries(statistics[homeTeam.id]).map(
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
                        statistics[homeTeam.id].powerAttack,
                        statistics[awayTeam.id].powerDefenceAway,
                        statistics[homeTeam.id].leagueGoalsHome,
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
                        statistics[homeTeam.id].powerDefence,
                        statistics[awayTeam.id].powerAttackAway,
                        statistics[awayTeam.id].leagueGoalsHome,
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
                      {Object.entries(statistics[awayTeam.id]).map(
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
                        statistics[homeTeam.id].powerDefence,
                        statistics[awayTeam.id].powerAttackAway,
                        statistics[awayTeam.id].leagueGoalsHome,
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
