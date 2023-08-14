import ExecutiveLayout from "@/components/ExecutiveLayout";
import { memo, useEffect, useState } from "react";
import { customTheme } from "@/components/customTheme";
import { useRouter } from "next/router";
import { useContractSend } from "@/hooks/contract/useContractSend";
import { useAccount } from "wagmi";
import { CustomConnector } from "@/components/customConnector";
import { toast } from "react-toastify";
import { HexToDecimal } from '../../../components/helpers';
import { useForm } from "react-hook-form";

interface IFormInput {
    amount: number
}

const Executives = () => {
    const route = useRouter()
    const {id:number} = route.query

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>();

    const { address } = useAccount()

    const { writeLoading, write, waitError, writeError, prepareError, waitSuccess, waitLoading, waitData } = useContractSend({
        functionName: "initTransaction",
        args:[
            isNaN(watch("amount")) ? "0" : BigInt(watch("amount") * 1e18),
            number
        ],
        enabled: (watch("amount") != 0)
    })

    const submitHandler = () => {
        write?.()
    }

    useEffect(() => {
      let rerun:boolean = true

      if((waitError || writeError) && rerun){
        toast.error("Can't initiate withdrawal", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: 'dark'
        })
      }

      if(waitSuccess && rerun){
        toast.success(`successfully initiated withdrawal with order number ${HexToDecimal(waitData?.logs[0].data)}`, {
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

    }, [waitError, writeError, waitSuccess, waitData])
    


    return (
        <ExecutiveLayout>
            <h5 className="text-center mb-2 font-bold py-4">Initiate Withdrawal</h5>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     {...register("amount", {
                        required: true,
                        pattern: /^\d+\.?\d+$/
                     })}
                     className={`${customTheme.floating_input}`} 
                     placeholder=" "
                     autoComplete="off"
                    />
                    {errors?.amount?.type === "required" && <p className="text-red-500 text-sm">This field is required</p>}
                    {errors?.amount?.type === "pattern" && <p className="text-red-500 text-sm">Number above zero only</p>}
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Amount to withdraw</label>
                    <p className="text-red-600 h-4">
                        {
                           !errors?.amount && ((prepareError && watch("amount") != 0) && "You cannot initiate withdrawal")
                        }
                    </p>
                </div>
                <div className="flex justify-center mt-8">
                    {
                        address ?
                        <button
                        type="submit"
                        className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                        disabled={writeLoading || waitLoading}
                        >
                            {
                                (writeLoading || waitLoading) ? "Loading...." : "Initiate"
                            }
                        </button> :
                        <CustomConnector color="bg-goldenyellow" text="text-black" />
                    }
                </div>
            </form>
        </ExecutiveLayout>
    );
}

export default memo(Executives);