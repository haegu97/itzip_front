import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const accessTokenAtom = atomWithStorage<string>('accessToken', '');
const refreshTokenAtom = atomWithStorage<string>('refreshToken', '');

const setAccressTokenAtom = atom(null, (get, set, accessToken: string) => {
  set(accessTokenAtom, accessToken);
});

const setRefreshTokenAtom = atom(null, (get, set, refreshToken: string) => {
  set(refreshTokenAtom, refreshToken);
});

const clearTokenAtom = atom(null, (get, set) => {
  set(accessTokenAtom, '');
  set(refreshTokenAtom, '');
});

const getTokenState = () => {
  const accessToken = localStorage.getItem('accessToken') || '';
  const refreshToken = localStorage.getItem('refreshToken') || '';
  return { accessToken, refreshToken };
};

export {
  accessTokenAtom,
  refreshTokenAtom,
  setAccressTokenAtom,
  setRefreshTokenAtom,
  clearTokenAtom,
  getTokenState,
};