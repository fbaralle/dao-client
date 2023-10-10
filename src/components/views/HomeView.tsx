import { Button } from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import ProposalList from "@/components/molecules/ProposalList";
import HeaderMenu from "@/components/molecules/HeaderMenu";
import NewProposalModal from "../molecules/NewProposalModal";
import useStore from "@/store/useStore";
import { useUserWallet } from "@/context/wallet-data.context";

const HomeView = () => {
  const { userAddress } = useUserWallet();
  const { modalOpen, setModalOpen } = useStore((state) => state.modal);
  return (
    <main className="flex min-h-screen flex-col items-center mt-10 pb-20 px-[10%]">
      <HeaderMenu />
      <Text variant="h1" className="mb-10">
        The Global Finance Protocol
      </Text>
      <div className=" w-full flex flex-row justify-between mb-8">
        <Text variant="h2">Governance Overview</Text>
        <Button onClick={() => setModalOpen(true)} disabled={!userAddress}>
          New Proposal
        </Button>
        <NewProposalModal />
      </div>
      <ProposalList />
    </main>
  );
};

export default HomeView;
