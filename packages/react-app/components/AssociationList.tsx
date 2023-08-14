import React from "react";
import { customTheme } from "./customTheme";
import Link from "next/link";
import { useContractCall } from "@/hooks/contract/useContractCall";


const AssociationList = () => {

    const {data}:any = useContractCall({
        functionName: "getAllAssociations",
        watch: true
    })

    
    let associationData;
    if(data) associationData = data

    const tableHeadCell: string[] = [
        "Name",
        "Account Number",
        "Creator Address",
        " "
    ]
    
    return (
        <table className="table-auto w-full">
            <thead className="bg-black">
                <tr>
                    {
                        tableHeadCell.map((tableHeadCell, id) => (
                            <th key={id} className="bg-goldenyellow text-black py-3 font-bold text-md">
                                {tableHeadCell}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700 text-neutral-400 bg-black">
                {
                    associationData?.map((details:any, id:any) => (
                        <tr key={id} className="hover:bg-black">
                            <th className="py-10">
                                {details.infoAssName}
                            </th>
                            <th>
                                {Number(details.associationAcctNumber).toString().padStart(4, "0")}
                            </th>
                            <th>
                                {(details.infoAssCreator).slice(0, 6)}....{(details.infoAssCreator).slice(35, 42)}
                            </th>
                            <th>
                                <Link href={`/dashboard/${id + 1}`}>
                                    <button
                                        type="button"
                                        className={`${customTheme.outline_button}`}
                                    >
                                        <span className={`${customTheme.button_span} bg-black`}>
                                            View more
                                        </span>
                                    </button>
                                </Link>
                            </th>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default AssociationList;