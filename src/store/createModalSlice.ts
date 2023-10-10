import { SetState } from "zustand";
import { produce } from "immer";

import { AppState } from "@/store/useStore";

export enum ProposalModalSteps {
  CREATE,
  SUCCESS,
  ERROR,
}

export interface ModalSlice {
  modalStep?: ProposalModalSteps;
  modalOpen: boolean;
  confirmationLink?: string;
  /**
   * The next action that needs to be handled after the current one is
   * processed.
   * */
  forwardAction?: string;
  setModalStep: (step: ProposalModalSteps) => void;
  setModalOpen: (open: boolean) => void;
  setConfirmationLink?: (confirmationLink: string) => void;
  /**
   * Callback function that will be called after a transaction
   * is successfully submitted.
   * Then it will be cleaned up, right after it's executed
   */
  txSuccesCallback?: () => void;
  setTxSuccesCallback: (callback?: () => void) => void;
  closeModal: (callback?: () => void) => void;
}

const createModalSlice = (set: SetState<AppState>) => ({
  modalStep: ProposalModalSteps.CREATE,
  modalOpen: false,
  forwardAction: undefined,
  txSuccesCallback: undefined,
  confirmationLink: undefined,
  setModalStep: (modalStep: ProposalModalSteps) => {
    set(
      produce((draft: AppState) => {
        draft.modal.modalStep = modalStep;
      })
    );
  },
  setModalOpen: (modalOpen: boolean) => {
    set(
      produce((draft: AppState) => {
        draft.modal.modalOpen = modalOpen;
        draft.modal.modalStep = ProposalModalSteps.CREATE;
      })
    );
  },
  closeModal: (callback?: () => void) => {
    set(
      produce((draft: AppState) => {
        draft.modal.modalOpen = false;
        draft.modal.modalStep = ProposalModalSteps.CREATE;
      })
    );

    if (callback) callback();
  },
  setConfirmationLink: (confirmationLink: string) => {
    set(
      produce((draft: AppState) => {
        draft.modal.confirmationLink = confirmationLink;
      })
    );
  },
  setTxSuccesCallback: (callback?: () => void) => {
    set(
      produce((draft: AppState) => {
        draft.modal.txSuccesCallback = callback;
      })
    );
  },
});

export default createModalSlice;
