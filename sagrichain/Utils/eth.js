// utils/eth.js
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "YOUR_FARMER_CONTRACT_ADDRESS";
const ABI = [
    // The ABI of the FarmerContract
    // Paste the ABI generated during the contract compilation here
];

export const getEthereumObject = () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        return window.ethereum;
    }
    return null;
};

export const getProvider = () => {
    const ethereum = getEthereumObject();
    if (ethereum) {
        return new ethers.providers.Web3Provider(ethereum);
    }
    return null;
};

export const getSigner = () => {
    const provider = getProvider();
    if (provider) {
        return provider.getSigner();
    }
    return null;
};

export const getContract = () => {
    const signer = getSigner();
    if (signer) {
        return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    }
    return null;
};
