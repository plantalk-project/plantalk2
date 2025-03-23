import { atom } from "jotai";


export const modalTokenAtom = atom(localStorage.getItem("authToken"))