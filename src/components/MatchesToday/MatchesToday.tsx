import { List } from "@mantine/core";
import {
  getAttackRating,
  getProbabilities,
} from "../Matches/utils/calculate.ts";
import {
  Team as TeamType,
  TeamTableStatistics,
} from "../../api/matchesApi/types.ts";
import { FC } from "react";
import Team from "../Team/Team.tsx";
import styles from "./MatchesToday.module.scss";
import classNames from "classnames";

interface TeamProps {
  matches: {
    competition: {
      name: string;
      code: string;
    };
    homeTeam: TeamType;
    awayTeam: TeamType;
    id: number;
  }[];
  isReady: boolean;
  statistics: Record<string, Partial<TeamTableStatistics>>;
}

const MatchesToday: FC<TeamProps> = (props) => {
  const { matches, isReady, statistics } = props;

  return (
    <>
      {isReady &&
        matches?.map((match) => {
          const { id, homeTeam, awayTeam } = match;

          return (
            <List.Item
              key={id}
              styles={{
                itemLabel: {
                  display: "flex",
                  columnGap: "10px",
                  paddingBlock: "15px",
                  paddingInline: "25px",
                  outline: "2px solid #3B3B3B",
                  borderRadius: "12px",
                },
              }}
              className={classNames(styles.ListItem)}
            >
              <Team
                title={"Хозяева"}
                team={homeTeam}
                probabilities={getProbabilities(
                  statistics[homeTeam.id]?.powerAttack,
                  statistics[awayTeam.id]?.powerDefenceAway,
                  statistics[homeTeam.id]?.leagueGoalsHome,
                )}
                rating={getAttackRating(
                  statistics[homeTeam.id]?.powerAttack,
                  statistics[awayTeam.id]?.powerDefenceAway,
                  statistics[homeTeam.id]?.leagueGoalsHome,
                )}
                statistics={statistics}
              />
              <Team
                title={"Гости"}
                team={awayTeam}
                probabilities={getProbabilities(
                  statistics[homeTeam.id]?.powerDefence,
                  statistics[awayTeam.id]?.powerAttackAway,
                  statistics[awayTeam.id]?.leagueGoalsHome,
                )}
                rating={getAttackRating(
                  statistics[homeTeam.id]?.powerDefence,
                  statistics[awayTeam.id]?.powerAttackAway,
                  statistics[awayTeam.id]?.leagueGoalsHome,
                )}
                statistics={statistics}
              />
            </List.Item>
          );
        })}
    </>
  );
};

export default MatchesToday;
