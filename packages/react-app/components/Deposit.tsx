import { memo, useEffect } from "react";
import { customTheme } from "./customTheme";
import { useAccount, useWaitForTransaction } from "wagmi";
import { useApproveToken } from "@/hooks/contract/useApproveToken";
import { assBankCA, useContractSend } from "@/hooks/contract/useContractSend";
import { toast } from "react-toastify";
import { CustomConnector } from "./customConnector";
import { useTokenCall } from "@/hooks/contract/useTokenCall";
import { useForm } from "react-hook-form";


interface IFormInput {
    accountNumber: number;
    accountAmount: number;
}

// component that handles association member deposit
const Deposit = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>()

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
            parseInt(watch("accountNumber")?.toString()),
            isNaN(watch("accountAmount")) ? "0" : BigInt(watch("accountAmount") * 1e18)
        ],
        enabled: (Number(tokenData) >= (watch("accountAmount") * 1e18) && watch("accountAmount") != 0 && watch("accountNumber") != 0)
    })

    const { data, isLoading, write:tokenWrite } = useApproveToken({
        price: watch("accountAmount")
    })

    const {isError:tokenError, isLoading:tokenLoading} = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash,
        onSuccess(){
            write?.();
        }
    })

    const tokenAuthorization = () => {
        const priceInput = watch("accountAmount") * 1e18

        if(Number(tokenData) >= priceInput){
            write?.();
        } else{
            tokenWrite?.();
        }
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
            <form className="mt-8" onSubmit={handleSubmit(tokenAuthorization)}>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     {...register("accountNumber", {
                        required: true,
                        pattern: /[0-9]{4}/g
                     })}
                     type="tel"
                     className={`${customTheme.floating_input}`} 
                     placeholder=" "
                     autoComplete="off"
                    />
                    {errors?.accountNumber?.type === "required" && <p className="text-red-600 text-sm">This field is required</p>}
                    {errors?.accountNumber?.type === "pattern" && <p className="text-red-600 text-sm">Input a valid account number</p>}
                    <label htmlFor="floating_number" className={`${customTheme.floating_label}`}>Account Number</label>
                </div>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     {...register("accountAmount", {
                        required: true,
                        pattern: /^\d+\.?\d+$/
                     })}
                     className={`${customTheme.floating_input}`} 
                     placeholder=" "
                     autoComplete="off"
                    />
                    {errors?.accountAmount?.type === "required" && <p className="text-red-600 text-sm">This field is required</p>}
                    {errors?.accountAmount?.type === "pattern" && <p className="text-red-600 text-sm">Number above zero only</p>}
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