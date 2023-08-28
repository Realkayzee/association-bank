import Link from "next/link";
import { ReactNode } from "react";
import DashboardLayout from "./DashboardLayout";
import { useRouter } from "next/router";

interface Props {
    children: ReactNode;
    result: string;
}
export interface statusProps {
    name: string;
    link: string
}

const statusButtons: statusProps[] = [
    {
        name: "Check Balance",
        link: ""
    },
    {
        name: "Aproval Count",
        link: "approval"
    },
    {
        name: "Exco Request",
        link: "request"
    },
    {
        name: "User Deposit",
        link: "deposit"
    }
]

// This component is a layout for tabs in status tab of association dashboard
const FormLayout = (props:Props) => {
    const router = useRouter()
    const {id:ID} = router.query
    
    return (
        <DashboardLayout>
            <div>
                <div className="flex flex-row gap-4 justify-between bg-neutral-800 py-2 px-5 rounded-lg font-bold">
                    <div>
                        Result:
                    </div>
                    <div>
                        <div className="flex flex-row gap-2">
                            <p className="font-normal">
                                {props.result}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-800 w-2/3 mx-auto rounded-lg p-2 px-4 my-12">
                    {props.children}
                </div>
                <div className="flex flex-row border-y border-y-neutral-700 divide-x divide-neutral-700">
                    {
                        statusButtons.map((item, id) => (
                            <div className="basis-1/4 text-center hover:bg-neutral-800" key={id}>
                                <Link href={`/dashboard/${ID}/status/${item.link}`}>
                                    <div className="p-4">
                                        {item.name}
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </DashboardLayout>
    );
}

export default FormLayout;