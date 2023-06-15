// This hook is used to approve celo bank to spend user's cUSD token
// import wagmi hook to prepare and write to a smart contract

import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useContractRead } from "wagmi";
import erc20ABI from "@/abi/erc20ABI.json"
import { assBankCA } from "./useContractSend";

export const cUSDCA = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";


export const useApproveToken = (price:string | number) => {
    // Prepare write to smart contract
    
    const {config} = usePrepareContractWrite({
        address: cUSDCA,
        abi: erc20ABI,
        functionName: "approve",
        args: [
            assBankCA,
            price
        ]
    })


    // write to the smart contract using the prepared config

    const {data:writeData, isError:approveTokenError, isSuccess:approveTokenSuccess, isLoading:approveTokenLoading, write:tokenWrite } = useContractWrite(config);

    const {isError:approveError, isSuccess:approveSuccess, isLoading:approveLoading } = useWaitForTransaction({
        hash: writeData?.hash
    })

    return { tokenWrite, approveTokenError, approveTokenSuccess, approveTokenLoading, approveError, approveSuccess, approveLoading }
}
