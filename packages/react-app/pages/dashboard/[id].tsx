// import dashboard layout, custom hooks, deployed contract address
// wagmi hooks, toastify and react form hook
import DashboardLayout from "@/components/DashboardLayout";
import { customTheme } from "@/components/customTheme";
import { useApproveToken } from "@/hooks/contract/useApproveToken";
import { assBankCA, useContractSend } from "@/hooks/contract/useContractSend";
import { useTokenCall } from "@/hooks/contract/useTokenCall";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { CustomConnector } from '../../components/customConnector';
import { useForm } from "react-hook-form";

interface IFormInput {
    amount: number;
}

const DashBoard = () => {
    const router = useRouter()
    const {id:number} = router.query

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>();

    const {address} = useAccount()

    const {data:tokenData} = useTokenCall({
        functionName: "allowance",
        args:[
            address,
            assBankCA
        ],
        watch: true
    })
    
    const {writeLoading, write, waitError, waitSuccess, waitLoading} = useContractSend({
        functionName: "deposit",
        args: [
            number,
            isNaN(watch("amount")) ? "0" : BigInt(watch("amount") * 1e18)
        ],
        enabled: (Number(tokenData) >= (watch("amount") * 1e18) && watch("amount") != 0)
    })
    
    const { data, isLoading, write:tokenWrite } = useApproveToken({
        price: watch("amount")
    })

    const {isError:tokenError, isLoading:tokenLoading} = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash,
        onSuccess(){
            write?.();
        }
    })

    const tokenAuthorization = () => {
        const priceInput = watch("amount") * 1e18

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
          rerun = false
        }
    }, [waitError, waitSuccess, tokenError])

    return (
        <DashboardLayout>
            <div className="bg-neutral-800 w-2/3 mx-auto my-12 rounded-lg p-8">
                <h2 className="font-bold text-center">Deposit</h2>
                <form className="mt-8" onSubmit={handleSubmit(tokenAuthorization)}>
                    <div className="relative w-full mb-6 z-0 group">
                        <input
                        {...register("amount", {
                            required: true,
                            pattern: /^\d*\.?\d*$/
                        })}
                        className={`${customTheme.floating_input}`}
                        placeholder=" "
                        autoComplete="off"
                        />
                        {errors?.amount?.type === "required" && <p className="text-red-600 text-sm">This field is required</p>}
                        {errors?.amount?.type === "pattern" && <p className="text-red-600 text-sm">Number above zero only</p>}
                        <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Amount to Deposit</label>
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
        </DashboardLayout>
    );
}

export default DashBoard;