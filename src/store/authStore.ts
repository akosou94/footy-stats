import { AuthApi, SignInCredentials, SignUpCredentials } from "../api";
import { action, makeObservable, observable, runInAction } from "mobx";
import { NavigateService } from "../services";

export class AuthStore {
  isLoading = false;

  constructor(
    private authApi: AuthApi,
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
      .then(() => {
        this.navigateService.toHome();
      })
      .catch(() => this.navigateService.toSignUp())
      .finally(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  signUp(data: SignUpCredentials) {
    this.isLoading = true;

    return this.authApi
      .signUp(data)
      .then(() => {
        this.navigateService.toHome();
      })
      .catch(() => this.navigateService.toSignUp())
      .finally(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }
}
