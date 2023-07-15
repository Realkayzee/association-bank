import React from "react";
import { Table } from "flowbite-react";
import { customTheme } from "./customTheme";
import Link from "next/link";
import { useContractCall } from "@/hooks/contract/useContractCall";


const AssociationList = () => {

    const {data}:any = useContractCall({
        functionName: "getAllAssociations"
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
        <div>
            <Table>
                <Table.Head className="bg-black">
                    {
                        tableHeadCell.map((tableHeadCell, id) => (
                            <Table.HeadCell key={id} className="bg-yellow-400 font-bold text-md">
                                {tableHeadCell}
                            </Table.HeadCell>
                        ))
                    }
                </Table.Head>
                <Table.Body className="divide-y divide-neutral-700 text-neutral-400 bg-black">
                    {
                        associationData?.map((details:any, id:any) => (
                            <Table.Row key={id} className="hover:bg-black">
                                <Table.Cell>
                                    {details.infoAssName}
                                </Table.Cell>
                                <Table.Cell>
                                    {Number(details.associationAcctNumber).toString().padStart(4, "0")}
                                </Table.Cell>
                                <Table.Cell>
                                    {(details.infoAssCreator).slice(0, 6)}....{(details.infoAssCreator).slice(35, 42)}
                                </Table.Cell>
                                <Table.Cell>
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
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    );
}

export default AssociationList;