import { SwapView, useSwap } from "@/hooks/useSwap"

export function RefferCard() {

  const {referData} = useSwap({
    view: SwapView.Referral
  })
  
  return (
    <div className="mt-[2.94rem] w-full relative">
      <div className="w-[70rem] h-[14rem] bg-no-repeat bg-contain bg-[url('/images/refferDataBG.png')] flex flex-col gap-y-24 pt-[3rem]">
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start ml-[10rem]">
            <div className="flex items-center">
              <img src="/images/refer-person-icon.png" alt="refferDataIcon" className="w-8 h-8 mr-2" />
              <span className="text-white font-verdana font-bold text-[1rem]">
                Number of Guests
              </span>
            </div>
            <span className="text-white font-verdana font-bold text-[1.5rem] self-center mt-10">
              {referData?.referCount || 0}
            </span>
          </div>
          <div className="flex flex-col items-start mr-[10rem]">
            <div className="flex items-center">
              <img src="/images/refer-price-icon.png" alt="refferDataIcon" className="w-8 h-8 mr-2" />
              <span className="text-white font-verdana font-bold text-[1rem]">
                Gross commission
              </span>
            </div>
            <span className="text-white font-verdana font-bold text-[1.5rem] self-center mt-10">
              {referData?.totalRebateFeeUSD || 0} $
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}