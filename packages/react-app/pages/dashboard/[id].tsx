import DashboardLayout from "@/components/DashboardLayout";
import { customTheme } from "@/components/customTheme";

const DashBoard = () => {
    return (
        <DashboardLayout>
            <div className="bg-neutral-800 w-2/3 mx-auto my-12 rounded-lg p-8">
                <h2 className="font-bold text-center">Deposit</h2>
                <form className="mt-8">
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
            </div>
        </DashboardLayout>
    );
}

export default DashBoard;