"use client";
import { useReferManager } from "@/contracts/useContract/useReferManager";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useAccount, useChainId } from "wagmi";

export default function Text() {

  const UseReferManager = useReferManager();
  const account = useAccount();
  const chainId = useChainId()

  const [formData, setFormData] = useState({
    to: '0xff5f3E0a160392fBF4fFfD9Eb6F629c121E92d9e',
    chainId: '97',
    account: '0x974Ea02978EbfD98479B757748B628a7be5770E8',
    referrer: '0x35eDD5f2c2205C4e88F3a69279D1EF06497cF44a',
  });

  const [signedTransaction, setSignedTransaction] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/refer', formData);
      setSignedTransaction(response.data.signedTransaction);
    } catch (error) {
      console.error('Error signing transaction:', error);
    }
  };

  async function referOf() {
    if (account.address) {
      const result = await UseReferManager.referrerOf(chainId, account.address);
      console.log('Refer of:', result);
    }
  }

  return (
    <div className="h-[125rem] relative bg-[#0B0C1D] flex justify-center">
      <img alt="background" src="/images/common-bg.svg" className="absolute top-0 left-0 bg-no-repeat z-0" />
      <div className="relative z-10" style={{ marginTop: '100px' }}>
        <Button
          onClick={handleSubmit}
          className="bg-button-gradient text-white mt-8 w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
          Refer
        </Button>
      </div>
      <div className="relative z-10" style={{ marginTop: '100px' }}>
        <Button
          onClick={referOf}
          className="bg-button-gradient text-white mt-8 w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
          ReferOf
        </Button>
      </div>
    </div>
  );
}
