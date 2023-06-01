import React from "react";
import { erc20ABI } from "wagmi";
import assBankABI from "../abi/associationBank.abi.json"


// Contract address setup
export const associationBankCA = "0xBa69555747C6dc370f4AD1eE179e9Fc3ec56C26C";
export const cUSDCA = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

// Association bank interaction setup
export const assBankSetup = {
    address: associationBankCA,
    abi: assBankABI
}

export const erc20Setup = {
    address: cUSDCA,
    abi: erc20ABI
}
