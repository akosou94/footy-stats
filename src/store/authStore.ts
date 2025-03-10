import { AppAuthApi, SignInCredentials } from "../api";
import { action, makeObservable, observable, runInAction } from "mobx";
import { NavigateService } from "../services";

export class AuthStore {
  isLoading = false;

  constructor(
    private authApi: AppAuthApi,
    public navigateService: NavigateService,
  ) {
    makeObservable(this, {
      isLoading: observable,
      signIn: action,
    });
  }

  signIn(data: SignInCredentials) {
    this.isLoading = true;

    return this.authApi
      .signIn(data)
      .then(() => this.navigateService.toHome())
      .catch((r) => console.log(r))
      .finally(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }
}
