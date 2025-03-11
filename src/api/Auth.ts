import { AxiosInstance } from "axios";
import { TokenService } from "../services";

export interface User {
  id: string;
  is_active: boolean;
  username: string;
}

export interface AuthApi {
  signIn(data: SignInCredentials): Promise<Tokens>;

  signUp(data: SignUpCredentials): Promise<SignUpResponse>;

  me(): Promise<User>;

  refresh(): Promise<Tokens>;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  password: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface SignUpResponse {
  tokens: Tokens;
  user: User;
}

export class AppAuthApi implements AuthApi {
  static init(httpService: AxiosInstance, tokenService: TokenService) {
    return new AppAuthApi(httpService, tokenService);
  }

  constructor(
    private httpService: AxiosInstance,
    private tokenService: TokenService
  ) {}

  private setTokens(tokens: Tokens) {
    this.tokenService.setTokens({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
  }

  signIn(data: SignInCredentials) {
    return this.httpService.post<Tokens>("/sign_in", data).then((r) => {
      this.setTokens(r.data);

      return r.data;
    });
  }

  signUp(data: SignUpCredentials) {
    return this.httpService.post<SignUpResponse>("/sign_up", data).then((r) => {
      this.setTokens(r.data.tokens);

      return r.data;
    });
  }

  refresh() {
    return this.httpService
      .post<Tokens>("/refresh", {
        refreshToken: this.tokenService.getRefreshToken(),
      })
      .then((r) => {
        this.setTokens(r.data);

        return r.data;
      });
  }

  me() {
    return this.httpService.get<User>("/me").then((r) => {
      return r.data;
    });
  }
}
