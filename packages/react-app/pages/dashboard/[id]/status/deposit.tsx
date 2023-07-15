import React, { useEffect, useState } from "react";
import FormLayout from "@/components/FormLayout";
import { customTheme } from "@/components/customTheme";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import handler from '../../../api/hello';
import { useDebounce } from "use-debounce";
import { useContractCall } from "@/hooks/contract/useContractCall";
import { toast } from "react-toastify";



const Deposit = () => {
    const route = useRouter()
    const {id:number} = route.query
    const { address } = useAccount()
    const [user, setUser] = useState("")
    const [handler, setHandler] = useState<boolean>(false)
    const [debounceAddress] = useDebounce(user, 500)


    const { data, error, isError }:any = useContractCall({
        functionName: "checkUserDeposit",
        args: [
            number,
            handler && debounceAddress
        ],
        enabled: (handler && debounceAddress != "")
    })

    const handleSubmit = () => {
        setHandler(true)
    }

    const handleResult = () => {
        if(data){
            return `${(Number(data) / 1e18).toLocaleString()} cUSD`
        } else{
            return "0 cUSD"
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
            debounceAddress == "" && setHandler(false)
        }

    }, [isError, error?.cause.reason, handler, debounceAddress])


    return (
        <div>
            <FormLayout result={handleResult()}>
                <h5 className="text-center mb-2 font-bold">User Deposit</h5>
                    <div className="relative w-full mb-6 z-0 group">
                        <input
                         type="text" 
                         name="floating_deposit" 
                         id="floating_deposit" 
                         className={`${customTheme.floating_input}`} 
                         placeholder=" " 
                         required
                         onChange={(e) => setUser(e.target.value)}
                         autoComplete="off"
                        />
                        <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>User Address</label>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                        type="button"
                        className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                        onClick={handleSubmit}
                        >
                            Check Deposit
                        </button>
                    </div>
            </FormLayout>
        </div>
    );
}

export default React.memo(Deposit);