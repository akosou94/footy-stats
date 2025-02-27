import { poisson } from "./poisson.ts";

export const avg = (count: number, length: number) => Number((count / length).toFixed(2));

export const ratingAttackTeam = (powerAttackH: number, powerDefenceA: number, avgGoalsLeague: number) =>
	Number(Number(powerAttackH) * Number(powerDefenceA) * Number(avgGoalsLeague)).toFixed(2);

export const getProbabilities = (ratingAttack: string) => {
	const events = [0, 1, 2, 3, 4];
	return events.map((item) => parseInt((poisson(1, item, ratingAttack) * 100).toFixed(2)));
};