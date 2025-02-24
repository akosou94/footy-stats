export interface Team {
	crest: string,
	id: number,
	name: string,
	shortName: string,
	tla: string
}

export interface Match {
	id: number,
	area: {
		code: string,
		flag: string,
		id: number,
		name: string
	},
	awayTeam: Team,
	competition: {
		code: string,
		emblem: string,
		id: number,
		name: string,
		type: string,
	}
	group: unknown,
	homeTeam: Team,
	matchday: number,
	score: {
		duration: string,
		fullTime: {
			away: number,
			home: number
		},
		halfTime: {
			away: number,
			home: number
		},
		winner: string
	},
	season: {
		currentMatchday: number,
		startDate: Date,
		endDate: Date,
		id: number,
		winner: string
	},
	stage: string,
	status: string,
	utcDate: string
}