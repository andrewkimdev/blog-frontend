import { jwtDecode } from 'jwt-decode';

import { AuthToken } from '../types';
import { getCurrentUnixTimeInSeconds } from '../functions';

export const isTokenInEffectiveTimeframe = (token: string): boolean => {
  const now = getCurrentUnixTimeInSeconds();
  const { iat, nbf, exp } = jwtDecode<AuthToken>(token);
  return exp >= now && nbf <= now && iat <= now;
}
