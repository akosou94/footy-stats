import { AppMatchesApi, MatchesApi } from "../api/matchesApi";
import { makeHttpService, TokenService } from "../services";
import { MatchesStore } from "./matchesStore.ts";

export class RootStore {
  private httpService = makeHttpService("/api", {
    ["X-Auth-Token"]: import.meta.env.VITE_API_TOKEN,
  });
  private tokenService = new TokenService();

  private matchesApi: MatchesApi = new AppMatchesApi(this.httpService);
  public matchesStore = new MatchesStore(this.matchesApi);

  // constructor(navigate: NavigateFunction) {

  // }
}
