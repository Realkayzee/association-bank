// import wagmi hook to prepare and write to a smart contract
// import contract abi
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import associationAbi from "@/abi/association.abi.json";


interface sendParameterProps {
    functionName: string;
    args?: Array<any>;
    enabled?: boolean;
}
// association bank deployed contract address
export const assBankCA = "0xD51f7530123515629D901A40b15c1361D57813fB";


// This hook is used to send transaction
export const useContractSend = ({functionName, args, enabled}:sendParameterProps) => {
    // Prepare write to smart contract

    const {config, isError:prepareError} = usePrepareContractWrite({
        address: assBankCA,         // The address of the smart contract,
        abi: associationAbi,        // The ABI of the smart contract
        functionName,               // The smart contract function name to call
        args,                       // The arguments to pass to the smart contract function
        enabled
    })

    // Write to the smart contract using the prepared config

    const {data:writeData, isError:writeError, isLoading:writeLoading, write} = useContractWrite(config);

    const {isError:waitError, isSuccess:waitSuccess, isLoading:waitLoading, data:waitData } = useWaitForTransaction({
        hash: writeData?.hash
    })

    return { writeLoading, write, waitError, writeError, prepareError, waitSuccess, waitLoading, waitData };
}