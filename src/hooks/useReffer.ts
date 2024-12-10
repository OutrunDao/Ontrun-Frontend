import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";


export function useReffer() {
  const account = useAccount();
  const [inviteLink, setInviteLink] = useState<string | undefined>();
  const loaction = window.location;

  useEffect(() => {
  function _() {
    if (!account || !account.address) return;
    setInviteLink(`${loaction.origin}/?${account.address}`);
  }
  _();
  console.log(inviteLink)
  }, [account]);

  return {
    inviteLink,
  };
}