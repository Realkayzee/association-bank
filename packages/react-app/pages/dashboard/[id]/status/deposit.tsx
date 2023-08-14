import React, { useEffect, useState } from "react";
import FormLayout from "@/components/FormLayout";
import { customTheme } from "@/components/customTheme";
import { useRouter } from "next/router";
import { useContractCall } from "@/hooks/contract/useContractCall";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form"

interface IFormInput {
    address: string
}


const Deposit = () => {
    const route = useRouter()
    const {id:number} = route.query

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>();

    const [handler, setHandler] = useState<boolean>(false)


    const { data, error, isError }:any = useContractCall({
        functionName: "checkUserDeposit",
        args: [
            number,
            handler && watch("address")
        ],
        enabled: (handler)
    })

    const submitHandler = () => {
        setHandler(true)
    }

    console.log(data, "kjds")

    const handleResult = () => {
        if(isNaN(Number(data))){
            return "0 cUSD"
        }else {
            return `${(Number(data) / 1e18).toLocaleString()} cUSD`
        }
    }

    useEffect(() => {
        let rerun:boolean = true

        if(isError && rerun && handler ){
            toast.error(`${error?.cause?.reason}`, {
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
            watch("address") == "" && setHandler(false)
        }

    }, [isError, error?.cause?.reason, handler, watch])


    return (
        <div>
            <FormLayout result={handleResult()}>
                <h5 className="text-center mb-2 font-bold">User Deposit</h5>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="relative w-full mb-6 z-0 group">
                        <input
                         {...register("address", {
                            required: true,
                            pattern: /(\b0x[A-fa-f0-9]{40}\b)/g
                         })}
                         className={`${customTheme.floating_input}`} 
                         placeholder=" "
                         autoComplete="off"
                        />
                        {errors?.address?.type === "required" && <p className="text-red-600 text-sm">This field is required</p>}
                        {errors?.address?.type === "pattern" && <p className="text-red-600 text-sm">Must be an ethereum address</p>}
                        <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>User Address</label>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                        type="submit"
                        className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                        >
                            Check Deposit
                        </button>
                    </div>
                </form>
                    
            </FormLayout>
        </div>
    );
}

export default React.memo(Deposit);