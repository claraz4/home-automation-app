import FeatureRow from "@/src/shared/components/FeatureRow";
import { useState } from "react";

export default function AuthorizationRow() {
  const [status, setStatus] = useState(true);

  return (
    <FeatureRow
      headingText="Authorization Required"
      subtitleText="2 Users"
      status={status}
      setStatus={setStatus}
      hasExtra={true}
      extraScreen={"/rooms"}
    />
  );
}
