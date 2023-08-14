import React, { useEffect, useState } from "react";
import FormLayout from "@/components/FormLayout";
import { customTheme } from "@/components/customTheme";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useDebounce } from "use-debounce";
import { useContractCall } from "@/hooks/contract/useContractCall";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

interface IFormInput {
    order: number;
}


const Approval = () => {
    const route = useRouter()
    const {id:number} = route.query

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>()

    const [handler, setHandler] = useState<boolean>(false)
    

    const { data, error, isError }:any = useContractCall({
        functionName: "ApprovalStatus",
        args: [
            number,
            handler && watch("order")
        ],
        enabled: (handler)
    })
    

    const submitHandler = () => {
        setHandler(true)
    }
    

    const handleResult = () => {
        if(isNaN(Number(data))){
            return "0"
        }else {
            return Number(data).toLocaleString()
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
            watch("order") == 0 && setHandler(false)
        }

    }, [isError, error?.cause?.reason, handler, watch])

    return (
        <FormLayout result={handleResult()}>
            <h5 className="text-center mb-2 font-bold">Approval Count</h5>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     {...register("order", {
                        required: true,
                        pattern: /^[1-9]+$/
                     })}
                     className={`${customTheme.floating_input}`} 
                     placeholder=" "
                     autoComplete="off"
                    />
                    {errors?.order?.type === "required" && <p className="text-red-600 text-sm">This field is required</p>}
                    {errors?.order?.type === "pattern" && <p className="text-red-600 text-sm">Number above zero only</p>}
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Order Number</label>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                    type="submit"
                    className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                    >
                        Check Approval
                    </button>
                </div>
            </form>
        </FormLayout>
    );
}

export default React.memo(Approval);