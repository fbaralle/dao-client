import { Button } from "@/components/atoms/Button";
import useStore from "@/store/useStore";
import { useUserWallet } from "@/context/wallet-data.context";

const NewProposalButton = () => {
  const { userAddress } = useUserWallet();
  const { setModalOpen } = useStore((state) => state.modal);
  return (
    <Button onClick={() => setModalOpen(true)} disabled={!userAddress}>
      New Proposal
    </Button>
  );
};

export default NewProposalButton;
