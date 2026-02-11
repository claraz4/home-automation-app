import { View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { useLocalSearchParams } from "expo-router";
import FeatureRow from "@/src/shared/components/FeatureRow";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { spaces } from "@/src/theme";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { SchedulePlugsList } from "@/src/features/schedule/components/create/SchedulePlugsList";
import PolicyConditions from "@/src/features/automation/components/create/PolicyConditions";
import { PolicyDTO } from "@/src/features/automation/types/PolicyDTO";
import Button from "@/src/shared/components/Button";
import useCreateEditPolicy from "@/src/features/automation/hooks/useCreateEditPolicy";
import { FormError } from "@/src/shared/errors/FormError";
import {
  StatusBoxInfo,
  statusBoxInfoClean,
} from "@/src/features/schedule/types/ScheduleUI";
import StatusBox from "@/src/shared/components/StatusBox";

interface CreateEditPolicyProps {
  policy: PolicyDTO;
  setPolicy: Dispatch<SetStateAction<PolicyDTO>>;
  headingText?: string;
  scrollToTop: () => void;
  fetchSinglePolicy?: () => void;
  isScheduleEdited?: boolean;
}

export default function CreateEditPolicy({
  policy,
  setPolicy,
  scrollToTop,
  headingText,
  fetchSinglePolicy,
  isScheduleEdited = false,
}: CreateEditPolicyProps) {
  const { mode } = useLocalSearchParams();
  const isCreating = mode === "create";
  const {
    name,
    isActive,
    onPlugs,
    offPlugs,
    tempGreaterThan,
    tempLessThan,
    powerSourceId,
  } = policy;

  const [error, setError] = useState<FormError | null>(null);
  const [statusBoxProps, setStatusBoxProps] =
    useState<StatusBoxInfo>(statusBoxInfoClean);
  const {
    updateName,
    updateOnPlugs,
    updateOffPlugs,
    editPolicyUI,
    toggleStatus,
    onEdit,
  } = useCreateEditPolicy({
    setPolicy,
    setError,
    scrollToTop,
    setStatusBoxProps,
    fetchSinglePolicy,
  });

  // Clear the error on change of schedule
  useEffect(() => {
    if (error) {
      setStatusBoxProps(statusBoxInfoClean);
    }

    setError(null);
  }, [policy]);

  // Check basic conditions before sending request to backend
  const isSaveEnabled = useMemo(
    () =>
      (tempGreaterThan !== null ||
        tempLessThan !== null ||
        powerSourceId !== null) &&
      name !== "" &&
      (onPlugs.length !== 0 || offPlugs.length !== 0),
    [tempLessThan, tempGreaterThan, powerSourceId, name, onPlugs, offPlugs],
  );

  return (
    <View style={{ rowGap: spaces.md }}>
      <Heading variant="h2" hasBackButton={true}>
        {isCreating ? headingText : name}
      </Heading>

      {statusBoxProps.isVisible && (
        <StatusBox
          title={statusBoxProps.title}
          isError={statusBoxProps.isError}
          message={statusBoxProps.message}
          hasClose={true}
          onClose={() => setStatusBoxProps(statusBoxInfoClean)}
        />
      )}

      <View style={{ rowGap: spaces.md }}>
        {!isCreating && (
          <FeatureRow
            headingText="Current State"
            hasSwitch
            status={policy.isActive}
            setStatus={() => toggleStatus(policy)}
          />
        )}
        {isCreating && (
          <AppTextInput
            label="Policy Name"
            value={name}
            onChange={updateName}
            containerStyle={{ marginTop: spaces.md }}
            hasError={error?.component === "name"}
          />
        )}
        {isActive && (
          <View style={{ rowGap: spaces.md }}>
            <PolicyConditions
              powerSourceId={policy.powerSourceId}
              tempLessThan={policy.tempLessThan}
              tempGreaterThan={policy.tempGreaterThan}
              editPolicy={editPolicyUI}
            />
            <SchedulePlugsList
              onPlugs={onPlugs}
              offPlugs={offPlugs}
              updateOnPlugs={updateOnPlugs}
              updateOffPlugs={updateOffPlugs}
              containerStyles={{ zIndex: -1 }}
            />
          </View>
        )}
        {isCreating ? (
          <Button
            text="Create New Policy"
            onPress={() => onEdit(policy)}
            invertColors={true}
            disabled={!isSaveEnabled}
          />
        ) : (
          <Button
            text="Edit Policy"
            onPress={() => onEdit(policy)}
            invertColors={true}
            disabled={!isScheduleEdited || !isSaveEnabled}
          />
        )}
      </View>
    </View>
  );
}
