import { customTheme } from "./customTheme";
import { useContractSend } from "@/hooks/contract/useContractSend";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { XMarkIcon } from "@heroicons/react/24/outline";


interface formProps {
    name: string,
    password: string,
    address: string
}



const CreateAccount = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [formInput, setFormInput] = useState<formProps>({
        name: '',
        password: '',
        address: '',
    })

    const [excos, setExcos] = useState<string[]>([]);

    console.log(formInput,excos, "sdjk");
    
    

    const handleChange = (e:any) => {
        setFormInput({...formInput, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(formInput, "kdsj");
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
                        <div className="min-h-screen mt-28 py-32">
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
                                    <form className="py-4 px-8">
                                        <div className="relative w-full mb-6 z-0 group">
                                            <input
                                             type="text"
                                             name="name"
                                             className={`${customTheme.floating_input}`} 
                                             placeholder=" " 
                                             required
                                             onChange={handleChange}
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
                                            />
                                            <label htmlFor="password" className={`${customTheme.floating_label}`}>Password</label>
                                        </div>
                                        <div className="relative w-full mb-6 z-0 group">
                                            <input
                                             type="text"
                                             name="address"
                                             id="address"
                                             className={`${customTheme.floating_input}`}
                                             placeholder=" "
                                             required
                                             onBlur={handleChange}
                                            />
                                            <label htmlFor="address" className={`${customTheme.floating_label}`}>Executive Address</label>
                                        </div>
                                        <div>
                                            <button
                                             type="button"
                                             className={`${customTheme.outline_button} text-black mr-2 mb-2`}
                                             onClick={() => excos.length < 5 ? setExcos([...excos, formInput.address]): ""}
                                             
                                            >
                                            <span className={`${customTheme.button_span} bg-neutral-800`}>
                                                Add Address
                                            </span>
                                            </button>
                                        </div>
                                        <div className="bg-neutral-900 py-4 px-2 w-full mt-2 rounded-lg">
                                            {
                                                excos.map((item, id) => (
                                                    <p key={id}>
                                                        {item}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                        <div className="flex justify-center mt-8">
                                            <button
                                            type="submit"
                                            className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                                            >
                                                Deposit
                                            </button>
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

export default CreateAccount;