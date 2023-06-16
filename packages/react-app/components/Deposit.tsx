import { useState } from "react";
import { useDebounce } from "use-debounce";
import { customTheme } from "./customTheme";


interface formType {
    number: string;
    amount: string;
}

// component that handles association member deposit
const Deposit = () => {
    const [formDetails, setFormDetails] = useState<formType>({
        number: '',
        amount: ''
    })
    const [associationName, setAssociationName] = useState<string>('');

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(associationName, "skj");
    }
    
    return (
        <div className="bg-neutral-800 w-1/2 mx-auto mt-24 rounded-lg p-8">
            <h2 className="font-bold">Member Deposit</h2>
            <form className="mt-8" onSubmit={handleSubmit}>
                <div className="relative w-full mb-6 z-0 group">
                    <input type="tel" pattern="[0-9]{5}" name="floating_number" id="floating_number" className={`${customTheme.floating_input}`} placeholder=" " onChange={(e) => setAssociationName(e.target.value)} required />
                    <label htmlFor="floating_number" className={`${customTheme.floating_label}`}>Account Number</label>
                </div>
                <div className="relative w-full mb-6 z-0 group">
                    <input type="tel" pattern="[0-9]{5}" name="floating_deposit" id="floating_deposit" className={`${customTheme.floating_input}`} placeholder=" " required />
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Amount to Deposit</label>
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
    );
}

export default Deposit;