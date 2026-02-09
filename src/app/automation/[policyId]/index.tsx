import ScreenView, { ScreenViewRef } from "@/src/shared/ui/ScreenView";
import { paddings } from "@/src/theme";
import CreateEditPolicy from "@/src/features/automation/components/create/CreateEditPolicy";
import { useCallback, useRef, useState } from "react";
import { PolicyDTO } from "@/src/features/automation/types/PolicyDTO";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import usePolicies from "@/src/features/automation/hooks/usePolicies";
import { arePoliciesEqual } from "@/src/features/automation/utils/policiesHelper";

const emptyPolicy = {
  isActive: true,
  powerSourceId: null,
  powerSourceName: null,
  tempGreaterThan: null,
  tempLessThan: null,
  name: "Policy Name",
  onPlugs: [],
  offPlugs: [],
};

export default function SinglePolicy() {
  const screenRef = useRef<ScreenViewRef>(null);
  const { policyId } = useLocalSearchParams<{ policyId: string }>();
  const { getSinglePolicy } = usePolicies();
  const [originalPolicy, setOriginalPolicy] = useState<PolicyDTO>(emptyPolicy);
  const [policy, setPolicy] = useState<PolicyDTO>(emptyPolicy);

  // Scroll to top
  const scrollToTop = () => screenRef.current?.scrollToTop();

  // Get a single policy
  const fetchSinglePolicy = useCallback(async () => {
    const res = await getSinglePolicy(policyId);

    if (res) {
      setPolicy(res);
      setOriginalPolicy(res);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void fetchSinglePolicy();
    }, []),
  );

  return (
    <ScreenView style={{ padding: paddings.page }} scroll ref={screenRef}>
      <CreateEditPolicy
        policy={policy}
        setPolicy={setPolicy}
        scrollToTop={scrollToTop}
        fetchSinglePolicy={fetchSinglePolicy}
        isScheduleEdited={!arePoliciesEqual(policy, originalPolicy)}
      />
    </ScreenView>
  );
}
