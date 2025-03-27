import { atom } from "jotai";

interface GrowthState {
  grouth: string;
  date: Date;
}

export const growthStateAtom = atom<GrowthState[]>([]);
