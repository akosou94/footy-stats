export class TokenService {
  private accessTokenKey = "acKey";
  private refreshTokenKey = "reKey";

  getAccessToken() {
    return sessionStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setAccessToken(token: string) {
    sessionStorage.setItem(this.accessTokenKey, token);
  }

  setRefreshToken(token: string) {
    localStorage.setItem(this.refreshTokenKey, token);
  }
}
