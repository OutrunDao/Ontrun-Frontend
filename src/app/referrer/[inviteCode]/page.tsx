"use client";
import { useEffect } from "react";
import { setCookie } from "nookies";

const ReferrerPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const inviteCode = path.split('/')[2]; // Assuming the invite code is the first segment after /referrer/
      if (inviteCode) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        setCookie(null, 'inviteCode', inviteCode, { expires, path: '/' });
        window.location.href = '/'; // Redirect to the homepage
      }
    }
  }, []);

  return null; // Render nothing as we are redirecting
};

export default ReferrerPage;