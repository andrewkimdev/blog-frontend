import { jwtDecode } from 'jwt-decode';

import { DecodedAuthToken } from '../types';
import { getCurrentUnixTimeInSeconds } from '../functions';

export const isTokenInEffectiveTimeframe = (token: string): boolean => {
  const now = getCurrentUnixTimeInSeconds();
  const { iat, exp } = jwtDecode<DecodedAuthToken>(token);

  return exp >= now && iat <= now;
}
