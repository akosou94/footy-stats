import { AuthApi, SignInCredentials, SignUpCredentials } from "../api";
import { action, makeObservable, observable, runInAction } from "mobx";
import { NavigateService } from "../services";

export interface User {
  id: string;
  username: string;
}

export class AuthStore {
  isLoading = false;
  user?: User;

  constructor(
    private authApi: AuthApi,
    public navigateService: NavigateService
  ) {
    makeObservable(this, {
      isLoading: observable,
      user: observable,
      signIn: action,
    });
  }

  signIn(data: SignInCredentials) {
    this.isLoading = true;

    return this.authApi
      .signIn(data)
      .then(() => {
        this.me();
      })
      .then(() => {
        this.navigateService.toHome();
      })
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
      .then((r) => {
        runInAction(() => {
          this.user = r.user;
        });

        this.navigateService.toHome();
      })
      .finally(() => {
        runInAction(() => {
          this.isLoading = false;
        });
      });
  }

  me() {
    this.authApi.me().then((user) => {
      runInAction(() => {
        this.user = user;
      });
    });
  }
}
