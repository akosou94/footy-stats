import { AppAuthApi, AppMatchesApi, AuthApi, MatchesApi } from "../api";
import {
  makeHttpService,
  makeHttpServiceMatches,
  NavigateService,
  TokenService,
} from "../services";
import { MatchesStore } from "./matchesStore.ts";
import { NavigateFunction } from "react-router";
import { AppStore } from "./appStore.ts";
import { AuthStore } from "./authStore.ts";
import { AxiosInstance } from "axios";

export class RootStore {
  private tokenService = new TokenService();
  private httpService = makeHttpServiceMatches(
    "https://934275f24512.vps.myjino.ru/footy",
  );
  private httpServiceSwagger: AxiosInstance;
  private authApi: AuthApi;
  private matchesApi: MatchesApi = new AppMatchesApi(this.httpService);

  public navigateService: NavigateService;
  public appStore: AppStore;
  public authStore: AuthStore;
  public matchesStore = new MatchesStore(this.matchesApi);

  constructor(private navigate: NavigateFunction) {
    this.navigateService = new NavigateService(this.navigate);
    const tokenService = this.tokenService;
    this.httpServiceSwagger = makeHttpService(
      "https://934275f24512.vps.myjino.ru/footy",
      {
        getTokenHeaders() {
          return {
            Authorization: `Bearer ${tokenService.getAccessToken()}`,
          };
        },
      },
    );
    this.authApi = AppAuthApi.init(this.httpServiceSwagger, this.tokenService);
    this.authStore = new AuthStore(this.authApi, this.navigateService);
    this.appStore = new AppStore(
      this.navigateService,
      this.authApi,
      this.authStore,
    );
  }
}
