// This hook is used to approve celo bank to spend user's cUSD token
// import wagmi hook to prepare and write to a smart contract

import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useContractRead } from "wagmi";
import tokenABI from "@/abi/erc20ABI.json";
import associationAbi from "@/abi/association.abi.json";
import { assBankCA } from "./useContractSend";
import { ethers } from "ethers";
import { HexToDecimal } from "@/components/helpers";


// Contract address of cUSDA

export const cUSDCA = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

interface approveParamsProps {
    price: string | number;
    user?: string;
    receipient?: string;
    functionName: string;
    args: Array<any>;
}

export const useApproveToken = ({price, user, receipient, functionName, args}: approveParamsProps) => {


    // Prepare write to smart contract for token contract
    
    const {config} = usePrepareContractWrite({
        address: cUSDCA,            // The address of the smart contract,
        abi: tokenABI,              // The ABI of the smart contract
        functionName: "approve",    // The smart contract function name to call
        args: [                     
            assBankCA,              // The arguments to pass to the smart contract function
            ethers.utils.parseEther(price? price.toString() : "0")
        ]
    })


    // write to the smart contract using the prepared config for token contract

    const {data:writeData, isLoading:approveTokenLoading, write:tokenWrite } = useContractWrite(config);

    const {isError:approveError, isSuccess:approveSuccess, isLoading:approveLoading } = useWaitForTransaction({
        hash: writeData?.hash
    })

    // prepare contract for contract call

    const {config:contractConfig} = usePrepareContractWrite({
        address: assBankCA,
        abi: associationAbi,
        functionName,
        args
    })

    const {data:contractData, isLoading:writeLoading, write} = useContractWrite(contractConfig)

    const {isError:waitError, isSuccess:waitSuccess, isLoading:waitLoading} = useWaitForTransaction({
        hash: contractData?.hash
    })

    const { data:tokenRead } = useContractRead({
        address: cUSDCA,
        abi: tokenABI,
        functionName: "allowance",
        args: [
            user,
            receipient
        ]
    })

    /* This function checks if association bank contract has the necessary amount
    ** allowance before requesting for amount approval
    */

    const tokenAuthorization = () => {
        const priceinput = ethers.utils.parseEther(price ? price.toString() : "0")
        // @ts-ignore
        if(HexToDecimal(tokenRead?._hex) > HexToDecimal(priceinput?._hex)) {
            write?.()
        }else {
            tokenWrite?.()
        }
    }

    return { approveTokenLoading, approveError, approveSuccess, approveLoading, tokenAuthorization, writeLoading, waitError, waitSuccess, waitLoading }
}