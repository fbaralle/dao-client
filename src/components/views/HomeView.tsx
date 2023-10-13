import Text from "@/components/atoms/Text";
import ProposalList from "@/components/molecules/ProposalList";
import HeaderMenu from "@/components/molecules/HeaderMenu";
import NewProposalModal from "../molecules/NewProposalModal";
import NewProposalButton from "../molecules/NewProposalButton";
import CurrentValue from "../molecules/CurrentValue";

const HomeView = () => {
  return (
    <main className="flex min-h-screen flex-col items-center mt-10 pb-20 px-[10%]">
      <HeaderMenu />
      <Text variant="h1" className="mb-6">
        The Global Finance Protocol
      </Text>
      <CurrentValue />
      <div className=" w-full flex flex-row justify-between mb-8">
        <Text variant="h2">Governance Overview</Text>
        <NewProposalButton />
        <NewProposalModal />
      </div>
      <ProposalList />
    </main>
  );
};

export default HomeView;
