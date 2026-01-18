import FeatureRow from "@/src/shared/components/FeatureRow";
import { useState } from "react";

interface PlugScheduleRowProps {
  scheduleName: string;
  time: string;
  action: string;
}

export default function PlugScheduleRow({
  scheduleName,
  time,
  action,
}: PlugScheduleRowProps) {
  const [status, setStatus] = useState(true);

  return (
    <FeatureRow
      headingText={`${scheduleName} - ${action}`}
      subtitleText={time}
      status={status}
      setStatus={setStatus}
      hasExtra={true}
      extraScreen={"/rooms"}
    />
  );
}
