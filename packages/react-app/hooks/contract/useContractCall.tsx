import { useContractRead } from "wagmi";
import associationAbi from "@/abi/association.abi.json";
import { assBankCA } from "./useContractSend";



export interface callParameterProps {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
    enabled?: boolean;
}

export const useContractCall = ({functionName, args, watch, enabled}: callParameterProps) => {

    const data = useContractRead({
        address: assBankCA,     // The address of the smart contract,
        abi: associationAbi,    // The ABI of the smart contract
        functionName,           // The smart contract function name to call
        args,                   // The arguments to pass to the smart contract function
        watch,                  // A boolean to watch for changes in the smart contract. If true, the hook will re-run when the smart contract changes
        enabled,
        onError: (err) => {
            console.log({ err })
        }
    })

    return data;
}