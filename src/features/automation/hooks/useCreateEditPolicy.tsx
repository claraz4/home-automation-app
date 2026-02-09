import { Dispatch, SetStateAction } from "react";
import { PolicyDTO } from "@/src/features/automation/types/PolicyDTO";
import { BasePlug } from "@/src/shared/types/BasePlug";
import usePolicies from "@/src/features/automation/hooks/usePolicies";

interface HooksProps {
  setPolicy: Dispatch<SetStateAction<PolicyDTO>>;
  fetchSinglePolicy?: () => void;
}

export default function useCreateEditPolicy({
  setPolicy,
  fetchSinglePolicy,
}: HooksProps) {
  const { togglePolicy } = usePolicies();

  // Update the name
  const updateName = (name: string) => setPolicy((prev) => ({ ...prev, name }));

  // Update the plugs that are on
  const updateOnPlugs = (onPlugs: BasePlug[]) =>
    setPolicy((prev) => ({ ...prev, onPlugs }));

  // Update the plugs that are off
  const updateOffPlugs = (offPlugs: BasePlug[]) =>
    setPolicy((prev) => ({ ...prev, offPlugs }));

  // Add/edit policy
  const editPolicyUI = (
    powerSourceId?: number | null,
    tempGreaterThan?: number | null,
    tempLessThan?: number | null,
  ) => {
    setPolicy((prev) => {
      const next = { ...prev };

      if (powerSourceId !== undefined) {
        next.powerSourceId = powerSourceId;
      }

      if (tempGreaterThan !== undefined) {
        next.tempGreaterThan = tempGreaterThan;
      }

      if (tempLessThan !== undefined) {
        next.tempLessThan = tempLessThan;
      }

      return next;
    });
  };

  // Toggle the policy status
  const toggleStatus = async (policy: PolicyDTO) => {
    if (!policy.id) {
      return;
    }

    const isActive = !policy.isActive;
    // const updatedPolicy = {
    //   ...policy,
    //   isActive,
    // };
    //
    // setPolicy(updatedPolicy);

    try {
      await togglePolicy(policy.id, isActive);
      if (fetchSinglePolicy) {
        void fetchSinglePolicy();
      }
    } catch (error) {
      // rollback on failure
      // setPolicy(policy);
      console.error(error);
    }
  };

  return {
    updateName,
    updateOnPlugs,
    updateOffPlugs,
    editPolicyUI,
    toggleStatus,
  };
}
