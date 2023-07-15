import ExecutiveLayout from "@/components/ExecutiveLayout";
import { CustomConnector } from "@/components/customConnector";
import { customTheme } from "@/components/customTheme";
import { useContractSend } from "@/hooks/contract/useContractSend";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { useAccount } from "wagmi";

const Withdraw = () => {
    const route = useRouter()
    const {id:number} = route.query
    const { address } = useAccount()
    const [order, setOrder] = useState("")
    const [debounceOrder] = useDebounce(order, 500)

    const { writeLoading, write, waitError, writeError, prepareError, waitSuccess, waitLoading } = useContractSend({
        functionName: "withdrawal",
        args: [
            number,
            debounceOrder
        ],
        enabled: (debounceOrder != "")
    })

    const handleSubmit = (e:any) => {
        e.preventDefault();

        write?.();
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
            <h5 className="text-center mb-2 font-bold py-4">Withdraw</h5>
            <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     type="number" 
                     name="floating_deposit" 
                     id="floating_deposit" 
                     className={`${customTheme.floating_input}`} 
                     placeholder=" " 
                     required 
                     onChange={(e) => setOrder(e.target.value)}
                    />
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Order Number</label>
                    <p className="text-red-600">
                        {
                            (prepareError && debounceOrder != "") && "You cannot withdraw"
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
                                (writeLoading || waitLoading) ? "Loading...." : "Withdraw"
                            }
                        </button> :
                        <CustomConnector color="bg-goldenyellow" text="text-black" />
                    }
                </div>
            </form>
        </ExecutiveLayout>
    );
}

export default memo(Withdraw);