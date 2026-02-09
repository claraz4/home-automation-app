import { Dispatch, SetStateAction } from "react";
import { PolicyDTO } from "@/src/features/automation/types/PolicyDTO";
import { BasePlug } from "@/src/shared/types/BasePlug";
import usePolicies from "@/src/features/automation/hooks/usePolicies";
import { FormError } from "@/src/shared/errors/FormError";
import { StatusBoxInfo } from "@/src/features/schedule/types/ScheduleUI";
import { showSuccess } from "@/src/shared/utils/messagesUtils";

interface HooksProps {
  setPolicy: Dispatch<SetStateAction<PolicyDTO>>;
  setError?: Dispatch<SetStateAction<FormError | null>>;
  setStatusBoxProps?: Dispatch<SetStateAction<StatusBoxInfo>>;
  scrollToTop?: () => void;
  fetchSinglePolicy?: () => void;
}

export default function useCreateEditPolicy({
  setPolicy,
  fetchSinglePolicy,
  setError,
  setStatusBoxProps,
  scrollToTop,
}: HooksProps) {
  const { togglePolicy, savePolicy } = usePolicies();

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
  }; // TODO

  // Handle the error on edit
  const handleEditError = (error: unknown) => {
    if (error instanceof FormError && setError) {
      setError(error);
      if (setStatusBoxProps) {
        setStatusBoxProps({
          isVisible: true,
          message: error.message,
          isError: true,
        });
      }

      if (scrollToTop) {
        scrollToTop();
      }
    } else {
      if (setStatusBoxProps) {
        setStatusBoxProps({
          isVisible: true,
          isError: true,
          title: "Error",
          message: "An error occurred while creating your policy",
        });
      }
    }
  };

  // Reset policy after creating
  const resetPolicy = () => {
    setPolicy({
      isActive: true,
      name: "",
      offPlugs: [],
      onPlugs: [],
      powerSourceId: null,
      tempGreaterThan: null,
      tempLessThan: null,
    });
  };

  // Edit or create a schedule
  const onEdit = async (policy: PolicyDTO) => {
    try {
      const isCreating = policy.id !== 0 && !!policy.id;

      await savePolicy(policy);
      if (setStatusBoxProps) {
        setStatusBoxProps(showSuccess(isCreating));
      }

      if (isCreating) {
        resetPolicy();
      }
    } catch (error) {
      handleEditError(error);
    }
  };

  return {
    updateName,
    updateOnPlugs,
    updateOffPlugs,
    editPolicyUI,
    toggleStatus,
    onEdit,
  };
}
