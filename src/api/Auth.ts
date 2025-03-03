import { AxiosInstance } from "axios";
import { TokenService } from "../services";

export interface AuthApi {
  signIn(_: SignInCredentials): Promise<Tokens>;

  refresh(): Promise<Tokens>;
}

export interface SignInCredentials {
  name: string;
  email: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export class AppAuthApi implements AuthApi {
  static init(httpService: AxiosInstance, tokenService: TokenService) {
    return new AppAuthApi(httpService, tokenService);
  }

  constructor(
    private httpService: AxiosInstance,
    private tokenService: TokenService,
  ) {}

  signIn(_: SignInCredentials) {
    return new Promise<Tokens>((resolve) => {
      setTimeout(() => {
        resolve({
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        });
      }, 2000);
    }).then((r) => {
      this.tokenService.setTokens(r);
      return r;
    });
  }

  refresh() {
    return new Promise<Tokens>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          accessToken: "accessToken",
          refreshToken: "refreshToken",
        });
      }, 2000);
    }).then((r) => {
      this.tokenService.setTokens(r);
      return r;
    });
  }
}
