import React from "react";
import FormLayout from "@/components/FormLayout";
import { customTheme } from "@/components/customTheme";



const request = () => {
    return (
        <div>
        <FormLayout result="jksdjkds">
            <h5 className="text-center mb-2 font-bold">Exco. Request</h5>
            <form>
                <div className="relative w-full mb-6 z-0 group">
                    <input type="tel" pattern="[0-9]{7}" name="floating_deposit" id="floating_deposit" className={`${customTheme.floating_input}`} placeholder=" " required />
                    <label htmlFor="floating_deposit" className={`${customTheme.floating_label}`}>Order Number</label>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                    type="button"
                    className={`${customTheme.fill_button} text-neutral-800 mr-2 mb-2`}
                    >
                        Check Request
                    </button>
                </div>
            </form>
        </FormLayout>
        </div>
    );
}

export default React.memo(request);