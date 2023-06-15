import React from "react";
import { Table } from "flowbite-react";
import { customTheme } from "./customTheme";
import Link from "next/link";

const AssociationList = () => {
    const tableHeadCell: string[] = [
        "Name",
        "Account Number",
        "Creator Address",
        " "
    ] 

    const associationDetails: any[] = [
        {
            name: "Celo Bank1",
            account: "00001",
            creator: "0x230202a90edededdeadcbba263832"
        },
        {
            name: "Celo Bank2",
            account: "00002",
            creator: "0x230202a90edededdeadcbba263832"
        },
        {
            name: "Celo Bank3",
            account: "00003",
            creator: "0x230202a90edededdeadcbba263832"
        },
        {
            name: "Celo Bank4",
            account: "00004",
            creator: "0x230202a90edededdeadcbba263832"
        },
    ]

    console.log("rerender table");
    
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
                        associationDetails.map((details, id) => (
                            <Table.Row key={id} className="hover:bg-black">
                                <Table.Cell>
                                    {details.name}
                                </Table.Cell>
                                <Table.Cell>
                                    {details.account}
                                </Table.Cell>
                                <Table.Cell>
                                    {details.creator}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link href={`/dashboard/${id}`}>
                                        <button
                                            type="button"
                                            className={`${customTheme.outline_button}`}
                                        >
                                            <span className={`${customTheme.button_span}`}>
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