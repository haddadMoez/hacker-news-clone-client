import _ from 'lodash';
import { jwtParse } from './jwtParse';

export function jwtExpirationCheck(key, token) {
  const session = jwtParse(token);

  const current_time = new Date().getTime() / 1000;
  return current_time > _.get(session, 'exp');
}
