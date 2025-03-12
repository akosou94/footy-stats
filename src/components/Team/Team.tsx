import { mappedLabels } from "../Matches/utils/statistics.ts";
import { FC } from "react";
import { Team as TeamType } from "../../api/matchesApi/types";
import styles from "./Team.module.scss";

interface TeamProps {
  title: string;
  team: TeamType;
  probabilities: any;
  rating: any;
  statistics: any;
}

const Team: FC<TeamProps> = (props) => {
  const { title, team, probabilities, rating, statistics } = props;

  return (
    <div className={styles.Team}>
      <div className={styles.Team__Title}>
        <h3>{title}</h3>
        <img
          className={styles.Team__Image}
          src={team.crest}
          alt="Эмблема клуба"
        />
        <p>{team.shortName}</p>
      </div>
      <div>
        <h4 className={styles.Team__BlockTitle}>Вероятность забитых голов:</h4>
        {probabilities.map((item, index) => (
          <p className={styles.Team__Text}>
            {index} - {item}%
          </p>
        ))}
      </div>
      <div>
        <h4 className={styles.Team__BlockTitle}>Статистика команды:</h4>
        <ul>
          {Object.entries(statistics[team.id]).map(([key, value]) => (
            <li key={key} className={styles.Team__Text}>
              {mappedLabels[key]} - {value as string}
            </li>
          ))}
        </ul>
        <p className={styles.Team__Text}>Рейтинг атаки - {rating}</p>
      </div>
    </div>
  );
};

export default Team;
