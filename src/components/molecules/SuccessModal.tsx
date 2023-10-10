import React from "react";
import Text from "@/components/atoms/Text";
import { useUserWallet } from "@/context/wallet-data.context";
import { Button } from "../atoms/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface SuccessModalProps {
  txHash: string;
}

const SuccessTxModal: React.FC<SuccessModalProps> = ({ txHash }) => {
  const { client } = useUserWallet();
  const url = `${client.chain.blockExplorers?.etherscan?.url}/tx/${txHash}`;
  return (
    <>
      <div className="flex flex-col w-full p-8 pb-0 items-center gap-2">
        <Text variant="h2" className="mb-2 text-center">
          Proposal Transaction Submitted Successfully!
        </Text>
        <FontAwesomeIcon
          icon={faCircleCheck}
          size="2xl"
          className={`text-green-500`}
        />
      </div>
      <div className="flex flex-col items-center w-full p-8">
        <Link href={url} target="_blank" className="">
          <Button className="text-center">View blockchain confirmation</Button>
        </Link>
      </div>
    </>
  );
};

export default SuccessTxModal;
