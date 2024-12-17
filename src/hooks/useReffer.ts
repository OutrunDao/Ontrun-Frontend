import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";


export function useReffer() {
  const account = useAccount();
  const [inviteLink, setInviteLink] = useState<string | undefined>();

  useEffect(() => {
  function _() {
    if (!account || !account.address) return;
    if (typeof window !== "undefined") {
      const location = window.location;
      setInviteLink(`${location.origin}/?inviteCode=${account.address}`);
    }  
  }
  _();
  console.log(inviteLink)
  }, [account]);

  return {
    inviteLink,
  };
}