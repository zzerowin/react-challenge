import { atom, AtomEffect } from "recoil";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, JSON.stringify(newValue));
      });
    };

export interface ToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    ToDo: [],
    Doing: [],
    Done: [],
  },
  effects: [localStorageEffect("toDo")],
});

export const CreateCategory = atom({
  key: "CreateCategory",
  default: false,
});

export const ModalActive = atom({
  key: "Modal",
  default: false,
});

export const SelectedId = atom({
  key: "SelectedId",
  default: "",
});
