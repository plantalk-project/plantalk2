import { atom } from 'jotai';

export const usernameAtom = atom<string>('');
export const passwordAtom = atom<string>('');

// ログイン状態を管理するatom
export const isLoggedInAtom = atom<boolean>(false); 