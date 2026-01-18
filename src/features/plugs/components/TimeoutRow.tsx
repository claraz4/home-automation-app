import FeatureRow from "@/src/shared/components/FeatureRow";
import { Href, usePathname } from "expo-router";
import { HHMMSSToHoursMinutes } from "@/src/features/timeout/utils/timeoutUtils";

interface TimeoutRowProps {
  timeout: string | null;
}

export default function TimeoutRow({ timeout }: TimeoutRowProps) {
  const status = !!timeout;
  const pathname = usePathname();
  let timeoutSubtitle = "No timeout set yet";

  if (timeout) {
    const { hours, minutes } = HHMMSSToHoursMinutes(timeout);
    const hoursSubtitle =
      hours === 0 ? "" : `${hours} Hour${hours === 1 ? "" : "s"} `;
    const minutesSubtitle = `${minutes} Minutes`;

    timeoutSubtitle = `After ${hoursSubtitle}${minutesSubtitle}`;
  }

  return (
    <FeatureRow
      headingText="Auto Turn Off"
      subtitleText={timeoutSubtitle}
      status={status}
      setStatus={() => {}}
      hasExtra={true}
      extraScreen={`${pathname}/timeout` as Href}
    />
  );
}
