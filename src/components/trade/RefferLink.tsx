import { useReffer } from "@/hooks/useReffer";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import ToastCustom from "../ToastCustom";

export default function RefferLink() {

    const {inviteLink} = useReffer();

    

    function Copy() {
        if (!inviteLink) return;
        navigator.clipboard.writeText(inviteLink).then(() => {
            toast.custom(() => (
                <ToastCustom
                  content={"Copied to clipboard"}
                />
              ));
          });
    }

    return (
      <div className="w-[70rem] h-[8rem] bg-no-repeat bg-contain bg-[url('/images/refferLinkBG.png')] flex flex-col gap-y-24 justify-center">
        <div className="flex items-center justify-between w-full px-4">
          <span className="text-white font-verdana font-bold text-[1.5rem]">
            My invitation Link:
          </span>
          <div className="flex items-center space-x-4">
            <span
              className="text-white font-verdana font-bold text-[1rem] cursor-pointer"
            >
              {inviteLink}
            </span>
            <Button 
                className="bg-[#54377D] text-white"
                onClick={Copy}>
              Copy
            </Button>
          </div>
        </div>
      </div>
    )
}