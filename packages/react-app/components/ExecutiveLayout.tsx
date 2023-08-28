import DashboardLayout from "./DashboardLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import {statusProps} from "./FormLayout"
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}


const executiveButtons: statusProps[] = [
    {
        name: "Initiate Withdrawal",
        link: ""
    },
    {
        name: "Approve Withdrawal",
        link: "approve"
    },
    {
        name: "Revert Withdrawal",
        link: "revert"
    },
    {
        name: "Withdraw",
        link: "withdraw"
    }
]

// Layout component for executive tab in dashboard
const ExecutiveLayout = (props:Props) => {
    const router = useRouter()
    const {id:ID} = router.query

    return (
        <DashboardLayout>
            <div>
                <div className="bg-neutral-800 w-2/3 mx-auto rounded-lg p-2 px-4 my-12">
                    {props.children}
                </div>
                <div className="flex flex-row border-y border-y-neutral-700 divide-x divide-neutral-700">
                    {
                        executiveButtons.map((item, id) => (
                            <div className="basis-1/4 text-center hover:bg-neutral-800" key={id}>
                                <Link href={`/dashboard/${ID}/executives/${item.link}`}>
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

export default ExecutiveLayout;