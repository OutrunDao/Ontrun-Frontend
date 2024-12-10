import { ethers } from "ethers";
import { refferManagerAbi } from "../abis/refferManager";
import { Address } from "viem";
import { addressMap } from "../addressMap/addressMap";

export function useRefferManager() {

  async function getRefferManagerread(Address: string) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(Address, refferManagerAbi, provider);
  }

  async function getRefferManagerwrite(Address: string) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      return new ethers.Contract(Address, refferManagerAbi, signer);
  }

  async function referrerOf(chainId:number,address: Address) {
    const refferManager = await getRefferManagerread(addressMap[chainId].refferManager);
    return refferManager.referrerOf(address);
  }

  async function registerReferrer(chainId:number,address: Address, referrer: Address) {
    const refferManager = await getRefferManagerwrite(addressMap[chainId].refferManager);
    const tx = await refferManager.registerReferrer(address, referrer);
    const receipt = await tx.wait();
    return receipt;
  }

  return {
    referrerOf,
    registerReferrer,
  }
}