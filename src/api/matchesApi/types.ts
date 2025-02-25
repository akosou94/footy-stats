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

export interface Team {
	crest: string,
	id: number,
	name: string,
	shortName: string,
	tla: string
}

export interface TeamTable {
	won: number,
	draw: number,
	form: string,
	goalDifference: number,
	goalsAgainst: number,
	goalsFor: number,
	lost: number,
	playedGames: number,
	points: number,
	position: number,
	team: Team
}

export interface Standings {
	table: Array<TeamTable>
	type: 'TOTAL' | 'HOME' | 'AWAY'
}

export interface MatchInfoByYear {
	filters: {
		season: string
	},
	season: {
		currentMatchday: number,
		startDate: string,
		endDate: string,
		id: number,
		winner: string
	},
	standings: Array<Standings>
}