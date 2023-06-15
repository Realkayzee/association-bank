import React from "react";
import FormLayout from "@/components/FormLayout";
import { customTheme } from "@/components/customTheme";



const approval = () => {
    return (
        <FormLayout result="jksdjkds">
            <h5 className="text-center mb-2 font-bold">Approval Status</h5>
            <form>
                <div className="relative w-full mb-6 z-0 group">
                    <input type="tel" pattern="[0-9]{7}" name="floating_deposit" id="floating_deposit" className={`${customTheme.floating_input}`} placeholder=" " required />
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Amount to Deposit</label>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                    type="button"
                    className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                    >
                        Deposit
                    </button>
                </div>
            </form>
        </FormLayout>
    );
}

export default React.memo(approval);