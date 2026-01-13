import { View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import FeatureRow from "@/src/shared/components/FeatureRow";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings } from "@/src/theme";
import { useState } from "react";
import TimeoutOptions from "@/src/features/timeout/components/TimeoutOptions";

export default function TimeoutScreen() {
  const [status, setStatus] = useState(true);

  return (
    <ScreenView>
      <Heading variant="h2" hasBackButton={true}>
        Timeout
      </Heading>
      <View style={{ padding: paddings.page }}>
        <FeatureRow
          headingText="Auto Turn Off"
          hasSwitch={true}
          status={status}
          setStatus={setStatus}
        />
        {status && <TimeoutOptions />}
      </View>
    </ScreenView>
  );
}
