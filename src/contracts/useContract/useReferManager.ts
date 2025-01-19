import { ethers } from "ethers";
import { referManagerAbi } from "../abis/referManager";
import { Address } from "viem";
import { addressMap } from "../addressMap/addressMap";
import axios from "axios";

export function useReferManager() {

  async function getReferManagerread(Address: string) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(Address, referManagerAbi, provider);
  }

  async function getReferManagerwrite(Address: string) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return new ethers.Contract(Address, referManagerAbi, signer);
  }

  async function referrerOf(chainId:number,address: Address) {
    const refferManager = await getReferManagerread(addressMap[chainId].referManager);
    return refferManager.referrerOf(address);
  }

  async function registerReferrer(chainId:number,address: Address, referrer: Address) {
    const refferManager = await getReferManagerwrite(addressMap[chainId].referManager);
    const tx = await refferManager.registerReferrer(address, referrer);
    const receipt = await tx.wait();
    return receipt;
  }

  async function registerReferrerOutside(chainId:number,address: Address, referrer: Address) {
    const formData = {
      to: addressMap[chainId].referManager,
      chainId: chainId,
      account: address,
      referrer: referrer,
    }
    try {
      const response = await axios.post('http://123.57.164.143:3001/refer', formData);
      return response.data.receipt;
    } catch (error) {
      console.error('Error signing transaction:', error);
    }
  }

  return {
    referrerOf,
    registerReferrer,
    registerReferrerOutside,
  }
}