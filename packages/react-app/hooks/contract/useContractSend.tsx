// This hook is used to send transaction
// mport wagmi hook to prepare and write to a smart contract

import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import associationAbi from "@/abi/association.abi.json";

// Contract address of the two contract
export const assBankCA = "0xBa69555747C6dc370f4AD1eE179e9Fc3ec56C26C";

export const assBankSetup = {
    address: assBankCA,
    abi: associationAbi,
}

interface sendParameterProps {
    functionName: string;
    args?: Array<any>;
}



export const useContractSend = ({functionName, args}:sendParameterProps) => {
    // Prepare write to smart contract

    const {config} = usePrepareContractWrite({
        address: assBankCA,
        abi: associationAbi,
        functionName,
        args
    })

    // Write to the smart contract using the prepared config

    const {data:writeData, isError:writeError, isSuccess:writeSuccess, isLoading:writeLoading, write} = useContractWrite(config);

    const {isError:waitError, isSuccess:waitSuccess, isLoading:waitLoading } = useWaitForTransaction({
        hash: writeData?.hash
    })


    return { writeError, writeSuccess, writeLoading, write, waitError, waitSuccess, waitLoading };
}