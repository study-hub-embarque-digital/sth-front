const accessTokenCookieName = '@STH:Access:Token';
const refreshTokenCookieName = '@STH:Refresh:Token';

export class TokenHandler {
  static defineTokens(accessToken, refreshToken) {
    localStorage.setItem(accessTokenCookieName, accessToken);
    localStorage.setItem(refreshTokenCookieName, refreshToken);
  };

  static removeTokens() {
    localStorage.removeItem(accessTokenCookieName);
    localStorage.removeItem(refreshTokenCookieName);
  };

  static get accessToken() {
    return localStorage.getItem(accessTokenCookieName);
  };

  static get refreshTokenToken() {
    return localStorage.getItem(refreshTokenCookieName);
  };
};