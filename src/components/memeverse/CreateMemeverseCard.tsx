"use client"
import { useMemeverse } from "@/hooks/useMemeverse";
import { Button, Image, Input, Select, SelectItem, Tab, Tabs} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import ToastCustom from "../ToastCustom";
import { useChainId } from "wagmi";


export default function CreateMemeverseCard() {

  const chainId = useChainId();
  const [fileName, setFileName] = useState('');
  const {
    loading,
    memeverseData,
    memeverseSetPramas,
    setLoading,
    handleFee,
    registration,
  } = useMemeverse();

  function handleSelectFile(event:any) {
    
  }

  async function handleRegistration() {
    try {
      setLoading(true);
      const receipt = await registration();
      toast.custom(() => (
        <ToastCustom
          content={receipt.status === 1 ?
            <>
              {`Registration Success`}
            </>
            : "Transaction failed"
          }
        />
      ));
    } catch (error) {
      console.log(error);
      toast.custom(() => (
        <ToastCustom
          content={"Transaction failed"}
        />
      ));
    } finally {
      setLoading(false);
    }
    // setIsApproveToken0Loading(false);
  }
  
  return (
    <div className="w-[34rem] min-h-[26.59rem]">
      <Button
        disableRipple
        className="bg-transparent text-white text-[1.13rem] leading-[1.56rem] font-medium mb-12"
        startContent={<Image alt="back" src="/images/back.svg" />}>
        Back
      </Button>
      {/* bg-[#120A1C] */}
      <div className="w-[34rem] min-h-[39.13rem] shadow-card bg-modal border-[0.06rem] rounded-[1.25rem] border-card relative">
        <Tabs
          aria-label="swap"
          classNames={{
            base: "w-full",
            tab: "h-full data-[hover-unselected=true]:opacity-100 bg-transparent font-kronaOne",
            tabList: "h-full flex gap-x-8 rounded-none px-4 pt-8 bg-transparent border-white border-b border-divider",
            tabContent:
              "text-white group-data-[selected=true]:bg-title text-[1.5rem] leading-[1.88rem] font-kronaOne group-data-[selected=true]:text-transparent group-data-[selected=true]:bg-clip-text",
            cursor: "bg-transparent",
            panel: "mx-6 mb-8",
          }}>
            <Tab key="creat" title="Create Memeverse">
            <div className="text-white text-[0.75rem]">
              <div className="flex flex-wrap">
                <div className="flex justify-center items-center w-full">
                  <div className="w-1/2 p-2 flex justify-center">
                    <div>
                      <span>Name</span>
                      <Input
                        value={memeverseData.name}
                        onValueChange={(value) => {memeverseSetPramas.setName(value)}}
                        classNames={{
                          base: "text-white",
                          input:
                            "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1rem] leading-[1rem] font-avenir font-black w-full",
                          inputWrapper:
                            "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0 border-[0.1rem] border-[#30213D] w-full",
                          innerWrapper: "justify-start",
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 p-2 flex justify-center">
                    <div>
                      <span>Symbol</span>
                      <Input
                        value={memeverseData.symbol}
                        onValueChange={(value) => {memeverseSetPramas.setSymbol(value)}}
                        classNames={{
                          base: "text-white",
                          input:
                            "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1rem] leading-[1rem] font-avenir font-black w-full",
                          inputWrapper:
                            "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0 border-[0.1rem] border-[#30213D] w-full",
                          innerWrapper: "justify-start",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center w-full">
                  <div className="w-1/2 p-2 flex justify-center">
                    <div>
                      <span>DurationDays</span>
                      <Input
                        value={memeverseData.duration}
                        onValueChange={(value) => {memeverseSetPramas.setDuration(value)}}
                        classNames={{
                          base: "text-white",
                          input:
                            "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1rem] leading-[1rem] font-avenir font-black w-full",
                          inputWrapper:
                            "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0 border-[0.1rem] border-[#30213D] w-full",
                          innerWrapper: "justify-start",
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 p-2 flex justify-center">
                    <div>
                      <span>lockupDays</span>
                      <Input
                        value={memeverseData.lockupDays}
                        onValueChange={(value) => {memeverseSetPramas.setLockupDays(value)}}
                        classNames={{
                          base: "text-white",
                          input:
                            "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1rem] leading-[1rem] font-avenir font-black w-full",
                          inputWrapper:
                            "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0 border-[0.1rem] border-[#30213D] w-full",
                          innerWrapper: "justify-start",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center w-full">
                  <div className="w-1/2 p-2 flex justify-center">
                    <div>
                      <span>Select File</span>
                      <div className="flex items-center mt-2">
                        <label className="bg-white bg-opacity-10 border-[0.1rem] border-[#30213D] rounded-full px-4 py-2 cursor-pointer text-white">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                          />
                          Select File
                        </label>
                        <span className="ml-4 text-white">{fileName ? (fileName) : ("No file is selected")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 flex p-2 justify-center">
                    <div>
                      <span>maxFund</span>
                      <Input
                        value={memeverseData.maxFund}
                        onValueChange={(value) => {memeverseSetPramas.setMaxFund(value)}}
                        classNames={{
                          base: "text-white",
                          input:
                            "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1rem] leading-[1rem] font-avenir font-black w-full",
                          inputWrapper:
                            "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0 border-[0.1rem] border-[#30213D] w-full",
                          innerWrapper: "justify-start",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center w-full text-white">
                  <div className="w-full p-2">
                    <span>Description</span>
                    <textarea
                      className="w-full h-32 p-2 mt-2 border-[0.1rem] border-[#30213D] outline-none bg-white bg-opacity-5 text-white rounded-xl"
                      placeholder="Enter text here..."
                    />
                  </div>
                </div>

                <div className="flex justify-center items-center w-full">
                  <div className="w-1/2 p-2 flex justify-center">
                    <div>
                      <span>Website (optoinal)</span>
                      <Input
                        value={memeverseData.website}
                        onValueChange={(value) => {memeverseSetPramas.setWebsite(value)}}
                        classNames={{
                          base: "text-white",
                          input:
                            "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1rem] leading-[1rem] font-avenir font-black w-full",
                          inputWrapper:
                            "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0 border-[0.1rem] border-[#30213D] w-full",
                          innerWrapper: "justify-start",
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 p-2 flex justify-center">
                    <div>
                      <span>X (optoinal)</span>
                      <Input
                        value={memeverseData.X}
                        onValueChange={(value) => {memeverseSetPramas.setX(value)}}
                        classNames={{
                          base: "text-white",
                          input:
                            "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1rem] leading-[1rem] font-avenir font-black w-full",
                          inputWrapper:
                            "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0 border-[0.1rem] border-[#30213D] w-full",
                          innerWrapper: "justify-start",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center w-full">
                  <div className="w-1/2 p-2 flex justify-center">
                    <div>
                      <span>Telegrame (optoinal)</span>
                      <Input
                        value={memeverseData.telegram}
                        onValueChange={(value) => {memeverseSetPramas.setTelegram(value)}}
                        classNames={{
                          base: "text-white",
                          input:
                            "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1rem] leading-[1rem] font-avenir font-black w-full",
                          inputWrapper:
                            "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0 border-[0.1rem] border-[#30213D] w-full",
                          innerWrapper: "justify-start",
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 p-2 flex justify-center">
                    <div>
                      <span>Discord (optoinal)</span>
                      <Input
                        value={memeverseData.discord}
                        onValueChange={(value) => {memeverseSetPramas.setDiscord(value)}}
                        classNames={{
                          base: "text-white",
                          input:
                            "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1rem] leading-[1rem] font-avenir font-black w-full",
                          inputWrapper:
                            "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0 border-[0.1rem] border-[#30213D] w-full",
                          innerWrapper: "justify-start",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center w-full">
                  <div className="w-1/2 p-2 flex justify-center">
                    <div className="w-full mx-4">
                      <span>OmniChainIds</span>
                      <Select
                        classNames={{
                          trigger:
                            "bg-transparent data-[hover=true]:bg-transparent border-solid border-[0.1rem] border-[#30213D]",
                          value: "group-data-[has-value=true]:text-white ml-0",
                          popoverContent: "bg-[#4A325D]",
                          listboxWrapper: "text-white",
                        }}
                        onChange={(event) => {handleFee(event.target.value)}}
                        fullWidth={true}
                        placeholder="Select Chains"
                        selectionMode="multiple"
                        defaultSelectedKeys={[97]} // Fix: Wrap chainId in an array
                      >
                        {memeverseData.supportChains.map((chain) => (
                          <SelectItem key={chain.chainId}>{chain.chainName}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="w-1/2 p-2 flex justify-center">
                    <div>
                      <span>Layzero Fee</span>
                      <span>{memeverseData.fee}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center w-full">
                  <div className="flex justify-center space-x-4 mt-4">
                    <Button
                      onPress={handleRegistration}
                      isDisabled={false}
                      isLoading={loading}
                      className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
                        Create
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            </Tab>
          </Tabs>
      </div>
    </div>
  )
}
