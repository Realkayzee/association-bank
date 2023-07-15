import React, { useEffect, useState } from "react";
import FormLayout from "@/components/FormLayout";
import { customTheme } from "@/components/customTheme";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useDebounce } from "use-debounce";
import { useContractCall } from "@/hooks/contract/useContractCall";
import { toast } from "react-toastify";

const Status = () => {
    const route = useRouter()
    const {id:number} = route.query
    const { address } = useAccount()
    const [password, setPassword] = useState("")
    const [handler, setHandler] = useState<boolean>(false)
    const [debouncePassword] = useDebounce(password, 500)

    const { data, error, isError }:any = useContractCall({
        functionName: "AmountInAssociationVault",
        args: [
            number,
            handler && debouncePassword
        ],
        enabled: (handler && debouncePassword != "")
    })

    console.log(data);
    

    const handleSubmit = () => {
        setHandler(true)
    }

    const handleResult = () => {
        if(data){
            return `${(Number(data) / 1e18).toLocaleString()} cUSD`
        } else{
            return "*****"
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
            debouncePassword == "" && setHandler(false)
        }

    }, [isError, error?.cause.reason, handler, debouncePassword])


    return (
        <>
        <FormLayout result={handleResult()}>
            <h5 className="text-center mb-2 font-bold">Balance</h5>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     type="password"
                     name="floating_deposit" 
                     id="floating_deposit" 
                     className={`${customTheme.floating_input}`} 
                     placeholder=" " 
                     required
                     onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Password</label>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                    type="button"
                    className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                    onClick={handleSubmit}
                    >
                        Check Balance
                    </button>
                </div>
        </FormLayout>
        </>

    );
}

export default React.memo(Status);