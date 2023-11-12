export interface AuthToken {
  iss: string;
  sub: string;
  roles: string[];
  aud: string;
  nbf: number;
  iat: number;
  exp: number;
}
