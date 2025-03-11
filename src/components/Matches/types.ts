import { Team } from "../../api/matchesApi/types.ts";

export interface matchesInfo {
	id?: number,
	emblem: string,
	matchDay?: number,
	matches: Array<{
		competition: {
			name: string,
			code: string,
		},
		homeTeam: Team,
		awayTeam: Team,
		id: number
	}>
	competition: {
		code: string,
		emblem: string,
		id: number,
		name: string,
		type: string,
	}
}