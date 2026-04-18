import ScreenView, { ScreenViewRef } from "@/src/shared/ui/ScreenView";
import { paddings } from "@/src/theme";
import CreateEditPolicy from "@/src/features/automation/components/create/CreateEditPolicy";
import { useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ConfirmationMessagePopUp from "@/src/shared/components/ConfirmationMessagePopUp";
import { api } from "@/src/api/api";

export default function SinglePolicy() {
  const screenRef = useRef<ScreenViewRef>(null);
  const [isDeletePolicy, setIsDeletePolicy] = useState<boolean>(false);
  const { policyId } = useLocalSearchParams<{ policyId: string }>();

  // Scroll to top
  const scrollToTop = () => screenRef.current?.scrollToTop();

  // Delete the current policy
  const deletePolicy = async () => {
    try {
      await api.delete(`/policy/${policyId}`);
      router.push("/automation");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScreenView style={{ padding: paddings.page }} scroll ref={screenRef}>
      <CreateEditPolicy
        scrollToTop={scrollToTop}
        setIsDeletePolicy={setIsDeletePolicy}
      />
      <ConfirmationMessagePopUp
        headingText="Delete Policy"
        message={`Are you sure you want to delete this policy?`}
        onConfirm={deletePolicy}
        visible={isDeletePolicy}
        setVisible={setIsDeletePolicy}
      />
    </ScreenView>
  );
}
