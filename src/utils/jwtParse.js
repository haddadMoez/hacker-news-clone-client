import jwt from 'jsonwebtoken';

export function jwtParse(token) {
  if (!token) {
    return;
  }
  return jwt.decode(token);
}
