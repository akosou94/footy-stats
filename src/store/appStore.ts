import { makeAutoObservable, runInAction } from "mobx";
import { NavigateService } from "../services";
import { AuthStore } from "./authStore";

interface AuthS {
  refresh: () => void;
}

export class AppStore {
  isReady: boolean = false;

  constructor(
    private navigateService: NavigateService,
    private auth: AuthS,
    private authStore: AuthStore
  ) {
    makeAutoObservable(this);
  }

  async init() {
    try {
      await this.auth.refresh();
      await this.authStore.me();
    } catch (e) {
      this.navigateService.toSignIn();
      throw e;
    } finally {
      runInAction(() => {
        this.isReady = true;
      });
    }
  }
}
