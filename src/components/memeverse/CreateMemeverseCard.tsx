"use client"
import { Button, Image, Input, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";


export default function CreateMemeverseCard() {

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
              
            </Tab>
          </Tabs>
      </div>
    </div>
  )
}
