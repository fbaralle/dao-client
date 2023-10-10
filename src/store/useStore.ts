import { create } from "zustand";
import createModalSlice, { ModalSlice } from "./createModalSlice";
import createClientSlice, { ClientSlice } from "./createClientSlice";

export type AppState = {
  modal: ModalSlice;
  client: ClientSlice;
};

const useStore = create<AppState>((set, get) => ({
  modal: createModalSlice(set),
  client: createClientSlice(set),
}));

export default useStore;
