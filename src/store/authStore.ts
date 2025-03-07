import { AppAuthApi, SignInCredentials } from "../api";
import { action, makeObservable, observable, runInAction } from "mobx";

export class AuthStore {
  isLoading = false;

  constructor(private authApi: AppAuthApi) {
    makeObservable(this, {
      isLoading: observable,
      signIn: action,
    });
  }

  signIn(data: SignInCredentials) {
    this.isLoading = true;

    return this.authApi.signIn(data).finally(() => {
      runInAction(() => {
        this.isLoading = false;
      });
    });
  }
}
