import { atom } from 'jotai';

export const usernameAtom = atom<string>('');
export const mailAtom = atom<string>('');
export const passwordAtom = atom<string>('');
export const plantnameAtom = atom<string>('');
export const planttypeAtom = atom<string>('');

// ログイン状態を管理するatom
export const isLoggedInAtom = atom<boolean>(false); 