import { AppAuthApi, AppMatchesApi, MatchesApi } from "../api";
import { makeHttpService, NavigateService, TokenService } from "../services";
import { MatchesStore } from "./matchesStore.ts";
import { NavigateFunction } from "react-router";
import { AppStore } from "./appStore.ts";

export class RootStore {
  private httpService = makeHttpService("/api", {
    ["X-Auth-Token"]: import.meta.env.VITE_API_TOKEN,
  });
  private tokenService = new TokenService();
  private navigateService: NavigateService;
  private authApi = AppAuthApi.init(this.httpService, this.tokenService);
  public appStore: AppStore;

  private matchesApi: MatchesApi = new AppMatchesApi(this.httpService);
  public matchesStore = new MatchesStore(this.matchesApi);

  constructor(private navigate: NavigateFunction) {
    this.navigateService = new NavigateService(this.navigate);
    this.appStore = new AppStore(this.navigateService, this.authApi);
  }
}
