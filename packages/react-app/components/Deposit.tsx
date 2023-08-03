import { memo, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { customTheme } from "./customTheme";
import { useAccount, useWaitForTransaction } from "wagmi";
import { useApproveToken } from "@/hooks/contract/useApproveToken";
import { assBankCA, useContractSend } from "@/hooks/contract/useContractSend";
import { toast } from "react-toastify";
import { CustomConnector } from "./customConnector";
import { useTokenCall } from "@/hooks/contract/useTokenCall";


interface formType {
    floating_number: string;
    floating_amount: string;
}

// component that handles association member deposit
const Deposit = () => {
    const [formDetails, setFormDetails] = useState<formType>({
        floating_number: '',
        floating_amount: ''
    })

    const [{floating_amount, floating_number}] = useDebounce(formDetails, 500);

    const { address } = useAccount();

    const {data:tokenData} = useTokenCall({
        functionName: "allowance",
        args: [
            address,
            assBankCA
        ],
        watch: true
    })
    

    const {writeLoading, write, waitError, waitSuccess, waitLoading} = useContractSend({
        functionName: "deposit",
        args: [
            parseInt(floating_number),
            isNaN(Number(floating_amount)) ? "0" : BigInt(Number(floating_amount) * 1e18)
        ],
        enabled: (Number(tokenData) >= (Number(floating_amount) * 1e18) && floating_amount != "" && floating_number != "") 
    })

    const { data, isLoading, write:tokenWrite } = useApproveToken({
        price: floating_amount
    })

    const {isError:tokenError, isLoading:tokenLoading} = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash,
        onSuccess(){
            write?.();
        }
    })

    const tokenAuthorization = () => {
        const priceInput = Number(floating_amount) * 1e18

        if(Number(tokenData) >= priceInput){
            write?.();
        } else{
            tokenWrite?.();
        }
    }

    const handleChange = (e:any) => {
        setFormDetails({...formDetails, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        tokenAuthorization()
    }

    useEffect(() => {
      let rerun:boolean = true;

      if((waitError || tokenError) && rerun){
        toast.error("Error occured while deposition into an account", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'dark'
        })
      }

      if(waitSuccess && rerun){
        toast.success("successfully deposited into an account", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'dark'
        })
      }
    
      return () => {
        if(waitError || tokenError || waitSuccess){
            rerun = false
        }
      }
    }, [waitError, waitSuccess, tokenError])
    

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
                        disabled={writeLoading || waitLoading || isLoading || tokenLoading}
                        className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                        >
                            {
                                (writeLoading || waitLoading || isLoading || tokenLoading) ? "Loading..." : "Deposit"
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