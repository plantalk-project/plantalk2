import { atom } from "jotai";

interface GrowthState {
  grouth: string;
  date: Date;
}

const loadInitialState = () => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem('growthState');
    return savedState ? JSON.parse(savedState) : [];
  }
  return [];
};

export const growthStateAtom = atom(loadInitialState());
