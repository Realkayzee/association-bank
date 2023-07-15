import { memo, useEffect, useState } from "react";
import FormLayout from "@/components/FormLayout";
import { customTheme } from "@/components/customTheme";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useDebounce } from "use-debounce";
import { useContractCall } from "@/hooks/contract/useContractCall";
import { toast } from "react-toastify";



const Request = () => {
    const route = useRouter()
    const {id:number} = route.query
    const { address } = useAccount()
    const [order, setOrder] = useState("")
    const [handler, setHandler] = useState<boolean>(false)
    const [debounceOrder] = useDebounce(order, 500)


    const { data, error, isError }:any = useContractCall({
        functionName: "checkAmountRequest",
        args: [
            number,
            handler && debounceOrder
        ],
        enabled: (handler && debounceOrder != "")
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
            debounceOrder == "" && setHandler(false)
        }

    }, [isError, error?.cause.reason, handler, debounceOrder])


    return (
        <div>
        <FormLayout result={handleResult()}>
            <h5 className="text-center mb-2 font-bold">Exco. Request</h5>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     type="number"
                     name="floating_deposit" 
                     id="floating_deposit" 
                     className={`${customTheme.floating_input}`} 
                     placeholder=" " 
                     required 
                     onChange={(e) => setOrder(e.target.value)}
                     autoCapitalize="off"
                    />
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Order Number</label>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                    type="button"
                    className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                    onClick={handleSubmit}
                    >
                        Check Request
                    </button>
                </div>
        </FormLayout>
        </div>
    );
}

export default memo(Request);