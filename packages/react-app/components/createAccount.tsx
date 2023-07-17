import React, { useEffect } from "react";
import { customTheme } from "./customTheme";
import { useContractSend } from "@/hooks/contract/useContractSend";
import { useAccount } from "wagmi";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { XMarkIcon, FireIcon } from "@heroicons/react/24/outline";
import { CustomConnector } from "./customConnector";
import { toast } from "react-toastify";


interface formProps {
    name: string,
    password: string,
    address: string
}



const CreateAccount = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const {address} = useAccount();

    const [formInput, setFormInput] = useState<formProps>({
        name: '',
        password: '',
        address: '',
    })

    const [debouceValue] = useDebounce(formInput, 500)

    const [excos, setExcos] = useState<string[]>([]);

    const { writeLoading, write, waitError, waitSuccess, waitLoading, prepareError } = useContractSend({
        functionName: "createAccount",
        args: [
            debouceValue.name,
            excos,
            (excos.length).toString(),
            debouceValue.password
        ],
        enabled: (debouceValue.name != "" && debouceValue.password != "")
    })
    

    useEffect(() => {
        let rerun:boolean = true;
        if(waitError && rerun) {
            toast.error("Error occured while creating an account 😞", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'dark'
            })
        }
    
        if(waitSuccess && rerun) {
            toast.success("successfully created an account", {
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
    }, [waitError, waitSuccess])
    
    

    const handleChange = (e:any) => {
        setFormInput({...formInput, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        write?.();
    }

    const addAddress = () => {
        if(excos.length < 5 && formInput.address != '') {
            setExcos([...excos, formInput.address])
        }
    }

    return (
        <>
            <div className="flex justify-center mt-8">
                <button
                type="button"
                className={`${customTheme.outline_button} text-black mr-2 mb-2`}
                onClick={() => setOpenModal(!openModal)}
                >
                <span className={`${customTheme.button_span} bg-black`}>
                    Create Account
                </span>
                </button>
            </div>

            {/* Modal visibility */}
            {
                openModal && (
                    <div className="fixed top-0 left-0 w-full z-40 bg-neutral-0.5 backdrop-blur-sm">
                        <div className="min-h-screen py-32">
                            {/* Modal Content */}
                            <div className="bg-neutral-800 rounded-lg shadow-lg w-1/2 lg:w-2/5 xl:w-1/3 mx-auto divide-y divide-neutral-600 overflow-y-auto">
                                {/* Modal Header */}
                                <div className="flex flex-row justify-between py-4 px-8">
                                    <div className="font-bold">
                                        Create Account
                                    </div>
                                    <div onClick={() => setOpenModal(false)}>
                                        <XMarkIcon className="h-6 w-6 cursor-pointer" />
                                    </div>
                                </div>
                                {/* Modal Body */}
                                <div>
                                    <form className="py-4 px-8" onSubmit={handleSubmit}>
                                        <div className="relative w-full mb-6 z-0 group">
                                            <input
                                             type="text"
                                             name="name"
                                             className={`${customTheme.floating_input}`} 
                                             placeholder=" " 
                                             required
                                             onChange={handleChange}
                                             autoComplete="off"
                                             value={formInput.name}
                                            />
                                            <label htmlFor="name" className={`${customTheme.floating_label}`}>Association Name</label>
                                        </div>
                                        <div className="relative w-full mb-6 z-0 group">
                                            <input
                                             type="password"
                                             name="password"
                                             id="password"
                                             className={`${customTheme.floating_input}`}
                                             placeholder=" "
                                             required
                                             onChange={handleChange}
                                             value={formInput.password}
                                            />
                                            <label htmlFor="password" className={`${customTheme.floating_label}`}>Password</label>
                                        </div>
                                        <div className="relative w-full mb-2 z-0 group">
                                            <input
                                             type="text"
                                             name="address"
                                             id="address"
                                             className={`${customTheme.floating_input}`}
                                             placeholder=" "
                                             required
                                             onChange={handleChange}
                                             autoComplete="off"
                                             value={formInput.address}
                                            />
                                            <label htmlFor="address" className={`${customTheme.floating_label}`}>Executive Address</label>
                                        </div>
                                        {
                                            (excos.length == 5) ?
                                            <p className="text-red-500 text-sm">Exco addresses can not be more than five</p>
                                            : ""
                                        }
                                        <div>
                                            <button
                                             type="button"
                                             className={`${customTheme.outline_button} text-black mr-2 mb-2 mt-4`}
                                             onClick={addAddress}
                                            >
                                                <span className={`${customTheme.button_span} bg-neutral-800`}>
                                                    Add Address
                                                </span>
                                            </button>
                                        </div>
                                        {
                                            excos.length > 0 && (
                                                <div className="bg-neutral-900 py-4 px-2 w-full mt-2 rounded-lg">
                                                    {
                                                        excos.map((item, id) => (
                                                            <p key={id}>
                                                                {item.slice(0,10)}....{item.slice(30, 42)}
                                                            </p>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                        <p className='text-red-600'>
                                            {
                                                (prepareError && debouceValue.password != "") && "You cannot create account twice"
                                            }
                                        </p>
                                        <div className="flex justify-center mt-8">
                                            {
                                                address ?
                                                <button
                                                type="submit"
                                                className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                                                disabled={writeLoading || waitLoading}
                                                >
                                                    {
                                                        (writeLoading || waitLoading) ? "Loading..." : "Create Account"
                                                    }
                                                </button>:
                                                <CustomConnector color="bg-goldenyellow" text="text-black"/>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
        </>
    );
}

export default React.memo(CreateAccount);
