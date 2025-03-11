import { NavigateFunction } from "react-router";
import { ROUTES } from "../api/routing.constants.ts";

export class NavigateService {
  constructor(private navigate: NavigateFunction) {}

  toHome() {
    this.navigate(ROUTES.home);
  }

  toSignIn() {
    this.navigate(ROUTES.signIn);
  }

  toSignUp() {
    this.navigate(ROUTES.signUp);
  }
}
