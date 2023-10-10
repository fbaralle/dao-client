import { SetState } from "zustand";
import { produce } from "immer";
import { Client } from "viem";

import { AppState } from "@/store/useStore";

export interface ClientSlice {
  client?: Client;
  isConnected: boolean;
  setClient: (client: Client) => void;
}

const createClientSlice = (set: SetState<AppState>) => ({
  client: undefined,
  isConnected: false,
  setClient: (newClient: Client) => {
    set(
      produce((draft: AppState) => {
        draft.client.client = newClient;
        draft.client.isConnected = true;
      })
    );
  },
});

export default createClientSlice;
