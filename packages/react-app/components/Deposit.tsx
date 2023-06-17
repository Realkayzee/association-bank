import { memo, useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { customTheme } from "./customTheme";
import { useContractRead, useAccount } from "wagmi";
import { cUSDCA, useApproveToken } from "@/hooks/contract/useApproveToken";
import tokenAbi from "@/abi/erc20ABI.json";
import { assBankCA, useContractSend } from "@/hooks/contract/useContractSend";
import { ethers } from "ethers";
import { HexToDecimal } from "./helpers";
import { toast } from "react-toastify";
import { CustomConnector } from "./customConnector";
import { data } from "autoprefixer";


interface formType {
    floating_number: string;
    floating_amount: string;
}

// component that handles association member deposit
const Deposit = () => {
    const [formDetails, setFormDetails] = useState<formType>({
        floating_number: '0',
        floating_amount: '0'
    })

    const [{floating_amount, floating_number}] = useDebounce(formDetails, 500);

    const { address } = useAccount();

    const data = useApproveToken({
        price: floating_amount,
        user: address,
        receipient: assBankCA,
        functionName: "deposit",
        contractArgs: [
            floating_number,
            floating_amount
        ]
    })

    const  { approveTokenLoading, approveError, approveSuccess, approveLoading, tokenAuthorization, writeLoading, waitError, waitSuccess, waitLoading } = data


    const handleChange = (e:any) => {
        setFormDetails({...formDetails, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        tokenAuthorization?.();
        console.log(floating_amount, floating_number, "value");
    }

    useEffect(() => {
        let tokenToastRerun:boolean = true;
        let contractToastRerun:boolean = true;

        // toaster setup for result of approval. either error or success

        if(approveSuccess && tokenToastRerun) {
            toast.success("token approved successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'dark'
            })
        }
        if(approveError && tokenToastRerun) {
            toast.error("Error occured on token approval 😞", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'dark'
            })
        }

        // toaster setup for deposit transaction result, either error or success

        if(waitError && contractToastRerun) {
            toast.error("Error occured while trying to deposit 😞", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'dark'
            })
        }
    
        if(waitSuccess && contractToastRerun) {
            toast.success("Deposit successful 😊", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'dark'
            })
        }
    
      return () => {
        if(approveSuccess || approveError) {
            tokenToastRerun = false
        }
        if(waitError || waitSuccess) {
            contractToastRerun = false;
        }
      }
    }, [approveError, approveSuccess, waitError, waitSuccess])
    
    
    
    return (
        <div className="bg-neutral-800 w-1/2 mx-auto mt-24 rounded-lg p-8">
            <h2 className="font-bold">Member Deposit</h2>
            <form className="mt-8" onSubmit={handleSubmit}>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     type="tel"
                     name="floating_number" 
                     id="floating_number" 
                     className={`${customTheme.floating_input}`} 
                     placeholder=" " 
                     required
                     onChange={handleChange}
                     autoComplete="off"
                    />
                    <label htmlFor="floating_number" className={`${customTheme.floating_label}`}>Account Number</label>
                </div>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     type="tel"
                     name="floating_amount" 
                     id="floating_amount" 
                     className={`${customTheme.floating_input}`} 
                     placeholder=" " 
                     required
                     onChange={handleChange}
                     autoComplete="off"
                    />
                    <label htmlFor="floating_amount" className={`${customTheme.floating_label}`}>Amount to Deposit</label>
                </div>
                <div className="flex justify-center mt-8">
                    {
                        address ?
                        <button
                        type="submit"
                        disabled={approveTokenLoading || approveLoading || waitLoading || writeLoading}
                        className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                        >
                            {
                                (approveTokenLoading || approveLoading || waitLoading || writeLoading) ? "Loading..." : "Deposit"
                            }
                        </button>:
                        <CustomConnector color="bg-goldenyellow" text="text-black" />
                    }
                    
                </div>
            </form>
        </div>
    );
}

export default memo(Deposit);