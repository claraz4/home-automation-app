import FeatureRow from "@/src/shared/components/FeatureRow";
import { useState } from "react";

export default function TimeoutRow() {
  const [status, setStatus] = useState(true);

  return (
    <FeatureRow
      headingText="Auto Turn Off"
      subtitleText="After 2 Hours"
      status={status}
      setStatus={setStatus}
      hasExtraScreen={true}
      extraScreen={"/rooms"}
    />
  );
}
