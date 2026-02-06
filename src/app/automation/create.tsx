import ScreenView, { ScreenViewRef } from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { useRef, useState } from "react";
import CreateEditPolicy from "@/src/features/automation/components/create/CreateEditPolicy";
import { PolicyDTO } from "@/src/features/automation/types/PolicyDTO";

export default function CreatePolicy() {
  const screenRef = useRef<ScreenViewRef>(null);
  const [policy, setPolicy] = useState<PolicyDTO>({
    isActive: false,
    numOfPlugs: 0,
    powerSourceId: 1,
    powerSourceName: "edl",
    tempGreaterThan: 2,
    tempLessThan: 7,
    name: "",
    onPlugs: [],
    offPlugs: [],
  });

  // Scroll to top
  const scrollToTop = () => screenRef.current?.scrollToTop();

  return (
    <ScreenView
      style={{ padding: paddings.page, rowGap: spaces.lg }}
      scroll
      ref={screenRef}
    >
      <CreateEditPolicy
        scrollToTop={scrollToTop}
        policy={policy}
        setPolicy={setPolicy}
        isActive={true}
        headingText={"Create Policy"}
      />
    </ScreenView>
  );
}
