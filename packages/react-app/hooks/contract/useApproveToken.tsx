// This hook is used to approve celo bank to spend user's cUSD token
// import wagmi hook to prepare and write to a smart contract

import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useContractRead } from "wagmi";
import tokenABI from "@/abi/erc20ABI.json";
import { assBankCA } from "./useContractSend";
import { ethers } from "ethers";


// Contract address of cUSDA

export const cUSDCA = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

interface approveParamsProps {
    price: string | number;
}

export const useApproveToken = ({price}: approveParamsProps) => {


    // Prepare write to smart contract for token contract
    
    const {config} = usePrepareContractWrite({
        address: cUSDCA,            // The address of the smart contract,
        abi: tokenABI,              // The ABI of the smart contract
        functionName: "approve",    // The smart contract function name to call
        args: [                     
            assBankCA,              // The association bank contract address
            isNaN(Number(price)) ? "0" : BigInt(Number(price) * 1e18)                  // The deposit amount input
        ],
        onError: (err) => {
            console.log({err});
            
        }
    })


    // write to the smart contract using the prepared config for token contract

    const {data, isLoading, write} = useContractWrite(config);

    return {data, isLoading, write}
}