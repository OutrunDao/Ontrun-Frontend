"use client";
import { Button, Link, Tab, Tabs } from "@heroui/react";
import LiquidityTab from "./LiquidityTab";
import AllLiquidityTab from "./AllLiquidityTab";
import OwnerLiquidityTab from "./OwnerLiquidityTab";
import RefferLink from "./RefferLink";
import { RefferCard } from "./RefferCard";

export default function ReferralContent() {

  return (
    <div>
      <RefferLink />
      <RefferCard />
    </div>
  );
}
