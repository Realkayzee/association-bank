import ExecutiveLayout from "@/components/ExecutiveLayout";
import { CustomConnector } from "@/components/customConnector";
import { customTheme } from "@/components/customTheme";
import { useContractSend } from "@/hooks/contract/useContractSend";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { useForm } from "react-hook-form";

interface IFormInput {
    order: number;
}

const Revert = () => {
    const route = useRouter()
    const {id:number} = route.query
    const { address } = useAccount()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>()

    const { writeLoading, write, waitError, writeError, prepareError, waitSuccess, waitLoading } = useContractSend({
        functionName: "revertApproval",
        args: [
            number,
            watch("order")
        ],
        enabled: (watch("order") != 0)
    })
    
    const submitHandler = () => {
        write?.()
    }

    useEffect(() => {
        let rerun:boolean = true

        if((waitError || writeError) && rerun){
            toast.error("Can't approve withdrawal", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'dark'
            })
        }

        if(waitSuccess && rerun){
            toast.success("successfully initiated withdrawal", {
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

    }, [waitError, writeError, waitSuccess])

    return (
        <ExecutiveLayout>
            <h5 className="text-center mb-2 font-bold py-4">Revert Approval</h5>
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
                    {errors?.order?.type === "required" && <p className="text-red-500 text-sm">This field is required</p>}
                    {errors?.order?.type === "pattern" && <p className="text-red-500 text-sm">Number above zero only</p>}
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Order Number</label>
                    <p className="text-red-600 h-4">
                        {
                            !errors?.order && ((prepareError && watch("order") != 0) && "You cannot revert approval")
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
                                (writeLoading || waitLoading) ? "Loading...." : "Revert"
                            }
                        </button> :
                        <CustomConnector color="bg-goldenyellow" text="text-black" />
                    }
                </div>
            </form>
        </ExecutiveLayout>
    );
}

export default memo(Revert);