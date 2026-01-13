import FeatureRow from "@/src/shared/components/FeatureRow";
import { useState } from "react";
import { Href, usePathname } from "expo-router";

export default function TimeoutRow() {
  const [status, setStatus] = useState(true);
  const pathname = usePathname();

  return (
    <FeatureRow
      headingText="Auto Turn Off"
      subtitleText="After 2 Hours"
      status={status}
      setStatus={setStatus}
      hasExtraScreen={true}
      extraScreen={`${pathname}/timeout` as Href}
    />
  );
}
