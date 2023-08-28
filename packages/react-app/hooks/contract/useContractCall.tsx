// import wagmi hook, contract abi and deployed contract address
import { useContractRead } from "wagmi";
import associationAbi from "@/abi/association.abi.json";
import { assBankCA } from "./useContractSend";
import { useState } from "react";



export interface callParameterProps {
    functionName: string;
    args?: Array<any>;
    watch?: boolean;
    enabled?: boolean;
}

// This hook is used to read smart contract return data
export const useContractCall = ({functionName, args, watch, enabled}: callParameterProps) => {
    const [err, setErr] = useState<any>("")

    const data = useContractRead({
        address: assBankCA,     // The address of the smart contract,
        abi: associationAbi,    // The ABI of the smart contract
        functionName,           // The smart contract function name to call
        args,                   // The arguments to pass to the smart contract function
        watch,                  // A boolean to watch for changes in the smart contract. If true, the hook will re-run when the smart contract changes
        enabled,
        onError: (err) => {
            setErr(err);
        }
    })
    
    return data;
}