// The import list consist of custom hooks and hooks from wagmi, useDebounce, react-toastify and heroicons 
import React, { useEffect } from "react";
import { customTheme } from "./customTheme";
import { useContractSend } from "@/hooks/contract/useContractSend";
import { useAccount } from "wagmi";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CustomConnector } from "./customConnector";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

interface IFormInput {
    associationName: string,
    password: string,
    address: string
}


// Component responsible for creating association account

const CreateAccount = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [showpassword, setShowpassword] = useState(false)

    const {address} = useAccount();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>();


    const [excos, setExcos] = useState<string[]>([]);

    const { writeLoading, write, waitError, waitSuccess, waitLoading, prepareError } = useContractSend({
        functionName: "createAccount",
        args: [
            watch("associationName"),
            excos,
            (excos.length).toString(),
            watch("password")
        ],
        enabled: (excos.length > 0)
    })

    const addAddress = () => {
        if(excos.length < 5 && watch("address").match(/(\b0x[A-fa-f0-9]{40}\b)/g) && !excos.includes(watch("address"))) {
            setExcos([...excos, watch("address")])
        }
    }

    const submitHandler = () => {
        write?.()
    }

    const handlePassword = () => {
        setShowpassword(!showpassword)
    }
    
    useEffect(() => {
        let rerun:boolean = true;

        if(prepareError){
            toast.error("You cannot create multiple account😞", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'dark'
            })
        }
        if(waitError && rerun) {
            // error message as feedback if transaction isn't successful
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
            // success message as feedback if transaction is successful
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
    }, [waitError, waitSuccess, prepareError])

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
                        <div className="min-h-screen mt-28 py-24">
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
                                    <form className="py-4 px-8" onSubmit={handleSubmit(submitHandler)}>
                                        <div className="relative w-full mb-6 z-0 group">
                                            <input
                                             {...register("associationName", {
                                                required: true,
                                                pattern: /^[A-Za-z0-9_ ]+$/i
                                             })}
                                             className={`${customTheme.floating_input}`}
                                             placeholder=" "
                                             autoComplete="off"
                                            />
                                            {errors?.associationName?.type === "required" && <p className="text-red-600 text-sm">This field is required</p>}
                                            {errors?.associationName?.type === "pattern" && <p className="text-red-600 text-sm">Alphabetical characters only</p>}
                                            <label htmlFor="name" className={`${customTheme.floating_label}`}>Association Name</label>
                                        </div>
                                        <div className="relative w-full mb-6 z-0 group">
                                            <input
                                             type= {showpassword ? "text" : "password"}
                                             className={`${customTheme.floating_input}`}
                                             placeholder=" "
                                             {...register("password", {
                                                required: true,
                                                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
                                             })}
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
                                            <label htmlFor="password" className={`${customTheme.floating_label}`}>Password</label>
                                        </div>
                                        <div className="relative w-full mb-2 z-0 group">
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
                                            {
                                                (errors?.address?.type === "pattern" || watch("address") == "" || watch("address") == undefined) ?
                                                "":
                                                !watch("address")?.match(/(\b0x[A-fa-f0-9]{40}\b)/g) && <p className="text-red-600 text-sm">Must be an ethereum address</p>
                                            }
                                            <label htmlFor="address" className={`${customTheme.floating_label}`}>Executive Address</label>
                                        </div>
                                        {
                                            (excos.length == 5) && <p className="text-red-600 text-sm">Exco addresses can not be more than five</p>
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
                                        <div className="flex justify-center mt-8">
                                            {
                                                address ?
                                                <button
                                                type="submit"
                                                className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                                                disabled={writeLoading || waitLoading || prepareError}
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