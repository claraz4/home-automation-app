import ScreenView, { ScreenViewRef } from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { useRef } from "react";
import CreateEditPolicy from "@/src/features/automation/components/create/CreateEditPolicy";

export default function CreatePolicy() {
  const screenRef = useRef<ScreenViewRef>(null);

  // Scroll to top
  const scrollToTop = () => screenRef.current?.scrollToTop();

  return (
    <ScreenView
      style={{ padding: paddings.page, rowGap: spaces.lg }}
      scroll
      ref={screenRef}
    >
      <CreateEditPolicy scrollToTop={scrollToTop} name="Policy Name 1" />
    </ScreenView>
  );
}
