import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { REACT_APP_PRIVATE_KEY } from '../constants';

export const isValidToken = (token) => {
  try {
    if (_.isEmpty(token)) return null;
    const payload = jwt.verify(token, REACT_APP_PRIVATE_KEY);
    return !!payload;
  } catch (error) {}
};
