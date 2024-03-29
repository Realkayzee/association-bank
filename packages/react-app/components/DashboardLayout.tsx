import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

// custom sidebar type
interface sidebar {
    name: string,
    link: string
}

// List of sidebar items

const sideItems:sidebar[] = [
    {
        name: "Deposit",
        link: ""
    },
    {
        name: "Executives",
        link: "executives"
    },
    {
        name: "Status",
        link: "status"
    }
]


// Layout for association dashboard
const DashboardLayout: FC<Props> = ({children}) => {
    const router = useRouter()
    const {id:ID} = router.query

    return (
        <div className="py-24">
            <div className="w-4/5 mx-auto bg-neutral-800 rounded-lg p-8">
                <div className="flex flex-row gap-2">
                    <div className="basis-1/4 bg-neutral-900 p-4">
                        <div className="flex flex-col divide-y divide-neutral-800 h-96">
                            {
                                sideItems.map((item, id) => (
                                    <Link href={`/dashboard/${ID}/${item.link}`} key={id}>
                                        <div className="py-4 px-2 font-bold text-md rounded-sm hover:bg-neutral-800">
                                            {item.name}
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="basis-3/4 bg-neutral-900 p-4">
                        {children}
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default DashboardLayout;