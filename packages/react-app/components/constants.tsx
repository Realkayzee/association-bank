// Import The two contracts abi, cUSD abi and association bank abi
import { erc20ABI } from "wagmi";
import associationAbi from "../abi/association.abi.json";

// Contract address of the two contract
export const assBankCA = "0xBa69555747C6dc370f4AD1eE179e9Fc3ec56C26C";
export const cUSDCA = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

// associaiton bank interaction setup
export const assBankSetup = {
    address: assBankCA,
    abi: associationAbi
}

export const cUSDSetup = {
    adddress: cUSDCA,
    abi: erc20ABI
}

