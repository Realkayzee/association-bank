import Link from "next/link";
import { ReactNode } from "react";
import DashboardLayout from "./DashboardLayout";

interface Props {
    children: ReactNode;
    result: string;
}
interface statusProps {
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

const FormLayout = (props:Props) => {
    console.log(props.result, "result");
    
    return (
        <DashboardLayout>
            <div>
                <div className="flex flex-row gap-4 bg-neutral-800 py-2 px-5 rounded-lg font-bold">
                    <div className="basis-1/6">
                        Result:
                    </div>
                    <div className="basis-5/6 text-right">
                        *******************
                    </div>
                </div>
                <div className="bg-neutral-800 w-2/3 mx-auto rounded-lg p-2 px-4 my-12">
                    {props.children}
                </div>
                <div className="flex flex-row border-y border-y-neutral-700 divide-x divide-neutral-700">
                    {
                        statusButtons.map((item, id) => (
                            <div className="basis-1/4 text-center hover:bg-neutral-800" key={id}>
                                <Link href={`/dashboard/${0}/status/${item.link}`}>
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