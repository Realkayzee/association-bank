import React, { useEffect, useState } from "react";
import FormLayout from "@/components/FormLayout";
import { customTheme } from "@/components/customTheme";
import { useRouter } from "next/router";
import { useContractCall } from "@/hooks/contract/useContractCall";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";


interface IFormInput {
    password: string;
}

const Status = () => {
    const route = useRouter()
    const {id:number} = route.query

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>()

    const [showpassword, setShowpassword] = useState(false)
    const [handler, setHandler] = useState<boolean>(false)

    const { data, error, isError }:any = useContractCall({
        functionName: "AmountInAssociationVault",
        args: [
            number,
            handler && watch("password")
        ],
        enabled: (handler)
    })

    const handlePassword = () => {
        setShowpassword(!showpassword)
    }
    

    const submitHandler = () => {
        setHandler(true)
    }

    const handleResult = () => {
        if(isNaN(Number(data))){
            return "*****"
        }else {
            return `${(Number(data) / 1e18).toLocaleString()} cUSD`
        }
    }
    


    useEffect(() => {
        let rerun:boolean = true

        if(isError && rerun && handler ){
            toast.error(`${error?.cause.reason}`, {
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
            watch("password") == "" && setHandler(false)
        }

    }, [isError, error?.cause.reason, handler, watch])


    return (
        <>
        <FormLayout result={handleResult()}>
            <h5 className="text-center mb-2 font-bold">Balance</h5>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     {...register("password", {
                        required: true,
                        pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
                     })}
                     type= {showpassword ? "text": "password"}
                     className={`${customTheme.floating_input}`} 
                     placeholder=" "
                    />
                    <p
                    className="my-2 cursor-pointer font-bold text-sm"
                    onClick={handlePassword}
                    >
                        {showpassword ? "hide": "show"}
                    </p>
                    {errors?.password?.type === "required" && <p className="text-red-600 text-sm">This field is required</p>}
                    {errors?.password?.type === "pattern" && (
                        <p className="text-red-600 text-sm">
                            Password must contain at least one lowercase, uppercase, number and 8 characters long
                        </p>
                    )}
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Password</label>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                    type="submit"
                    className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                    >
                        Check Balance
                    </button>
                </div>
            </form>
        </FormLayout>
        </>

    );
}

export default React.memo(Status);