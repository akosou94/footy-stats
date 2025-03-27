import { AppAuthApi, AppMatchesApi, AuthApi, MatchesApi } from "../api";
import { makeHttpService, NavigateService, TokenService } from "../services";
import { MatchesStore } from "./matchesStore.ts";
import { NavigateFunction } from "react-router";
import { AppStore } from "./appStore.ts";
import { AuthStore } from "./authStore.ts";
import { AxiosInstance } from "axios";

export class RootStore {
  private tokenService = new TokenService();

  private httpService: AxiosInstance;
  private authApi: AuthApi;
  private matchesApi: MatchesApi;

  public navigateService: NavigateService;
  public appStore: AppStore;
  public authStore: AuthStore;
  public matchesStore;

  constructor(private navigate: NavigateFunction) {
    this.navigateService = new NavigateService(this.navigate);
    const tokenService = this.tokenService;
    this.httpService = makeHttpService(
      "https://934275f24512.vps.myjino.ru/footy",
      // "http://localhost:3000",

      {
        getTokenHeaders() {
          return {
            Authorization: `Bearer ${tokenService.getAccessToken()}`,
          };
        },
      },
    );
    this.authApi = AppAuthApi.init(this.httpService, this.tokenService);
    this.matchesApi = new AppMatchesApi(this.httpService);
    this.matchesStore = new MatchesStore(this.matchesApi);
    this.authStore = new AuthStore(this.authApi, this.navigateService);
    this.appStore = new AppStore(
      this.navigateService,
      this.authApi,
      this.authStore,
    );
  }
}
