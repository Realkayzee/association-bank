import ExecutiveLayout from "@/components/ExecutiveLayout";
import { memo, useEffect, useState } from "react";
import { customTheme } from "@/components/customTheme";
import { useRouter } from "next/router";
import { useContractSend } from "@/hooks/contract/useContractSend";
import { useDebounce } from "use-debounce";
import { useAccount } from "wagmi";
import { CustomConnector } from "@/components/customConnector";
import { toast } from "react-toastify";
import { HexToDecimal } from '../../../components/helpers';

const Executives = () => {
    const route = useRouter()
    const {id:number} = route.query
    const [amount, setAmount] = useState("")
    const [debounceAmount] = useDebounce(amount, 500)
    const { address } = useAccount()



    const { writeLoading, write, waitError, writeError, prepareError, waitSuccess, waitLoading, waitData } = useContractSend({
        functionName: "initTransaction",
        args:[
            BigInt(Number(debounceAmount) * 1e18),
            number
        ],
        enabled: (debounceAmount != "")
    })

    console.log(HexToDecimal(waitData?.logs[0].data), "data");
    


    const handleSubmit = (e:any) => {
        e.preventDefault();

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
            <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-6 z-0 group">
                    <input
                     type="tel"
                     name="floating_deposit" 
                     id="floating_deposit" 
                     className={`${customTheme.floating_input}`} 
                     placeholder=" " 
                     required
                     autoComplete="off"
                     onChange={(e) => setAmount(e.target.value)}
                    />
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Amount to withdraw</label>
                    <p className="text-red-600">
                        {
                            (prepareError && debounceAmount != "") && "You cannot initiate withdrawal"
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