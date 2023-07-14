// This hook is used to send transaction
// import wagmi hook to prepare and write to a smart contract

import { useContractWrite, usePrepareContractWrite } from "wagmi";
import associationAbi from "@/abi/association.abi.json"
import { assBankCA } from "./useContractSend";

interface sendParameterProps {
    functionName: string;
    args?: Array<any>;
}

export const useSendAsync = ({functionName, args}: sendParameterProps) => {
    // Prepare write to smart contract

    const {config} = usePrepareContractWrite({
        address: assBankCA,
        abi: associationAbi,
        functionName,
        args,
        onError: (err) => {
            console.log({err});
            
        }
    })

    // write to the smart contract using the prepared config for token contract
    const { data, isLoading, write, writeAsync } = useContractWrite(config);

    return { data, isLoading, write, writeAsync }
}

