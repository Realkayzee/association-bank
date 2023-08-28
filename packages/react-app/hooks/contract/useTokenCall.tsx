// import wagmi hook, token contract abi, token deployed contract address and parameter type
import { useContractRead } from "wagmi";
import tokenAbi from "@/abi/erc20ABI.json";
import { cUSDCA } from "./useApproveToken";
import { callParameterProps } from "./useContractCall";


export const useTokenCall = ({functionName, args, watch}: callParameterProps) => {
    
    const tokenData = useContractRead({
        address: cUSDCA,    // The address of the smart contract,
        abi: tokenAbi,      // The ABI of the smart contract
        functionName,       // The smart contract function name to call
        args,               // The arguments to pass to the smart contract function
        watch,              // A boolean to watch for changes in the smart contract. If true, the hook will re-run when the smart contract changes
        onError: (err) => {
            console.log({err})
        }
    })

    return tokenData;
}