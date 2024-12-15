import { endPointAbi } from "@/contracts/abis/endPoint";
import { memeverseAddressMap } from "@/contracts/addressMap/memeverseAddressMap";
import { ChainId } from "@/contracts/chains";
import { ethers } from "ethers";


export function useEndPoint() {
  async function getMemeverseRegistrationCenterRead() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(memeverseAddressMap[ChainId.BSC_TESTNET].endPoint, endPointAbi, provider);
  }

  async function getMemeverseRegistrationCenterWrite() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(memeverseAddressMap[ChainId.BSC_TESTNET].endPoint, endPointAbi, signer);
  }

  async function quote({
    omnichainIds,
    options,
    message,
  }: {
    omnichainIds: Number[];
    options: any;
    message: any;
  }) {
    const memeverseRegistrationCenterContract = await getMemeverseRegistrationCenterRead();
    const receipt = await memeverseRegistrationCenterContract.quote(omnichainIds, options, message);
    return receipt;
  }
}