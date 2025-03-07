import { AppAuthApi, AppMatchesApi, MatchesApi } from "../api";
import { makeHttpService, NavigateService, TokenService } from "../services";
import { MatchesStore } from "./matchesStore.ts";
import { NavigateFunction } from "react-router";
import { AppStore } from "./appStore.ts";
import { AuthStore } from "./authStore.ts";

export class RootStore {
  private httpService = makeHttpService("/api", {
    ["X-Auth-Token"]: import.meta.env.VITE_API_TOKEN,
  });

  private httpServiceSwagger = makeHttpService(
    "https://96adab9333c7.vps.myjino.ru/go/api/",
  );

  private tokenService = new TokenService();
  private authApi = AppAuthApi.init(this.httpServiceSwagger, this.tokenService);
  public navigateService: NavigateService;
  public appStore: AppStore;

  private matchesApi: MatchesApi = new AppMatchesApi(this.httpService);
  public matchesStore = new MatchesStore(this.matchesApi);
  public authStore = new AuthStore(this.authApi);

  constructor(private navigate: NavigateFunction) {
    this.navigateService = new NavigateService(this.navigate);
    this.appStore = new AppStore(this.navigateService, this.authApi);
  }
}
