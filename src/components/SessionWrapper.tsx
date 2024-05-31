"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

interface SessionWrapperProps {
  children: ReactNode;
}

const SessionWrapper: React.FC<SessionWrapperProps> = ({ children }) => {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
};

export default SessionWrapper;
