import Cookies from 'universal-cookie';
import { AUTH_TOKEN } from '../constants';
const cookies = new Cookies();

export const useSession = () => cookies.get(AUTH_TOKEN);
export const setSession = (session) =>
  cookies.set(AUTH_TOKEN, session, { path: '/' });
export const destroySession = () => cookies.remove(AUTH_TOKEN, { path: '/' });
