import { makeAutoObservable, runInAction } from "mobx";
import { NavigateService } from "../services";

interface AuthS {
  refresh: () => void;
}

export class AppStore {
  isReady: boolean = false;

  constructor(
    private navigateService: NavigateService,
    private auth: AuthS,
  ) {
    makeAutoObservable(this);
  }

  async init() {
    try {
      await this.auth.refresh();
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
