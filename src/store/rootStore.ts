import { makeHttpService } from "../services";
import { MatchesStore } from "./matchesStore.ts";
import { AppMatchesApi, MatchesApi } from "../api/matchesApi";

export class RootStore {
	private httpService = makeHttpService('/api',
		{
			["X-Auth-Token"]: import.meta.env.VITE_API_TOKEN,
		})
	private matchesApi: MatchesApi = new AppMatchesApi(this.httpService)
	public matchesStore = new MatchesStore(this.matchesApi)
}
