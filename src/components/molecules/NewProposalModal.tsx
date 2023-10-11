import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Modal } from "@/components/atoms/Modal";
import useStore from "@/store/useStore";
import { ModalButtons } from "@/components/molecules/ModalButtons";
import Text from "@/components/atoms/Text";
import FormGroup from "../atoms/Input/FormGroup";
import Label from "../atoms/Input/Label";
import FormInput from "../atoms/Input/FormInput";
import useContractActions from "@/hooks/useContractActions";
import { useUserWallet } from "@/context/wallet-data.context";
import toast from "react-hot-toast";
import { ProposalModalSteps } from "@/store/createModalSlice";
import SuccessTxModal from "./SuccessModal";

export interface Proposal {
  title: string;
  description: string;
  newValue: number;
}

export interface BuildProposalTxResponse {
  unsigned_tx: string;
  is_serialized: boolean;
}

const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 400;

const NewProposalModal = () => {
  const { userAddress } = useUserWallet();
  const { modalOpen, modalStep, setModalOpen, setModalStep, closeModal } =
    useStore((state) => state.modal);
  const { getBuildProposalTx } = useContractActions();

  const onClose = () => {
    setModalOpen(false);
  };

  const [title, setTitle] = useState<string>("");
  const [newValue, setNewValue] = useState<number>(1);
  const [proposalDescription, setProposalDescription] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const titleCharsLimitDistance = MAX_TITLE_LENGTH - (title?.length || 0);
  const isValidTitle = !!title && title.length > 5;
  const isValidProposalDetails =
    proposalDescription && proposalDescription.length > 10;
  const isValidInterestRate = !isNaN(newValue);

  const isSubmitDisabled =
    !userAddress ||
    !isValidTitle ||
    !isValidProposalDetails ||
    !isValidInterestRate;

  const handleChangeDescription = (e: any) => {
    const content = e.target.value;
    setProposalDescription(content);
  };

  const handleValueChange = (inputValue: any) => {
    const value = inputValue;

    if (isNaN(value) || Number(value) < 0) setNewValue(0);

    setNewValue(Number(value));
  };

  const handleChangeTitle = (e: any) => {
    const content = e.target.value;
    const length = (content && content?.length) || 0;
    if (length >= 0 && length <= MAX_TITLE_LENGTH) {
      setTitle(content);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmitProposal();
  };

  const onSubmitProposal = async () => {
    setSubmitting(true);
    try {
      const txReceipt = await getBuildProposalTx({
        title,
        description: proposalDescription,
        newValue,
      });

      console.log("onSubmitProposal", { txReceipt });
      setModalStep(ProposalModalSteps.SUCCESS);
      setTxHash(txReceipt);
    } catch (e) {
      toast.error("Submit error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (modalOpen) {
      setNewValue(0);
      setProposalDescription("");
      setTitle("");
      setTxHash(null);
    }
  }, [modalOpen]);

  return (
    <Modal
      onDismiss={onClose}
      open={modalOpen}
      closeButton
      allowInteractionOutside
      contentClassName="flex flex-col items-center pt-7 md:pt-7 rouded-lg justify-between min-w-[450px] md:w-fit md:w-fit md:max-w-[750px]"
    >
      {modalStep === ProposalModalSteps.CREATE && (
        <>
          <div className="flex flex-col w-full px-6">
            <Text variant="h3" className="mb-2">
              Create New Proposal
            </Text>
            <form onSubmit={onSubmitProposal}>
              <FormGroup className="flex flex-col mb-4">
                <Label htmlFor="title" isRequired>
                  Title
                </Label>
                <FormInput
                  value={title}
                  disabled={false}
                  placeholder="Create a title for the proposal"
                  id="title"
                  name="title"
                  onChange={handleChangeTitle}
                  maxLength={MAX_TITLE_LENGTH}
                />
                <span className="text-xs text-gray-400 mt-2">{`${titleCharsLimitDistance} characters remaining`}</span>
              </FormGroup>

              <FormGroup className="flex flex-col mb-4">
                <Label htmlFor="proposalDetails" isRequired>
                  Details
                </Label>
                <FormInput
                  value={proposalDescription}
                  as="textarea"
                  disabled={false}
                  placeholder="Explain your proposal"
                  id="title"
                  name="title"
                  onChange={handleChangeDescription}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                />
              </FormGroup>

              <FormGroup className="flex flex-col">
                <Label htmlFor="category" isRequired>
                  {"New Interest Rate (%)"}
                </Label>
                <CurrencyInput
                  onValueChange={handleValueChange}
                  className="flex w-full border-solid border-[1px] border-subdued rounded-md items-center bg-background-popout p-2"
                  placeholder="Interest Rate (%)"
                  allowDecimals={false}
                  allowNegativeValue={false}
                  disableAbbreviations={true}
                  value={newValue}
                  maxLength={3}
                  // onKeyPress={handleKeyPress}
                />
                <span className="text-xs text-gray-400 mt-2">
                  Interest rate between 0 and 100
                </span>
              </FormGroup>
            </form>
          </div>

          <ModalButtons
            title={"Create Proposal"}
            secondaryButton
            loading={submitting}
            secondaryTitle="Close"
            variant="primary"
            disabled={isSubmitDisabled}
            onClick={(e) => handleSubmit(e)}
            secondaryClick={closeModal}
            containerClassName="border-0 md:border-0 jusitfy-self-end self-end"
            buttonClassName="justify-center w-full"
          />
        </>
      )}
      {modalStep === ProposalModalSteps.SUCCESS && txHash && (
        <SuccessTxModal txHash={txHash} />
      )}
    </Modal>
  );
};

export default NewProposalModal;
