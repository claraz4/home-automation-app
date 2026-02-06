import { View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { useLocalSearchParams } from "expo-router";
import FeatureRow from "@/src/shared/components/FeatureRow";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { spaces } from "@/src/theme";
import { Dispatch, SetStateAction } from "react";
import { SchedulePlugsList } from "@/src/features/schedule/components/create/SchedulePlugsList";
import { BasePlug } from "@/src/shared/types/BasePlug";
import PolicyConditions from "@/src/features/automation/components/create/PolicyConditions";
import {
  PolicyCreateDTO,
  PolicyDTO,
} from "@/src/features/automation/types/PolicyDTO";
import Button from "@/src/shared/components/Button";
import { api } from "@/src/api/api";

interface CreateEditPolicyProps {
  policy: PolicyDTO;
  setPolicy: Dispatch<SetStateAction<PolicyDTO>>;
  isActive: boolean;
  headingText?: string;
  scrollToTop: () => void;
}

export default function CreateEditPolicy({
  policy,
  setPolicy,
  isActive,
  scrollToTop,
  headingText,
}: CreateEditPolicyProps) {
  const { mode } = useLocalSearchParams();
  const isCreating = mode === "create";
  const {
    name,
    onPlugs,
    offPlugs,
    powerSourceId,
    tempGreaterThan,
    tempLessThan,
  } = policy;

  // Update the name
  const updateName = (name: string) => setPolicy((prev) => ({ ...prev, name }));

  // Update the plugs that are on
  const updateOnPlugs = (onPlugs: BasePlug[]) =>
    setPolicy((prev) => ({ ...prev, onPlugs }));

  // Update the plugs that are off
  const updateOffPlugs = (offPlugs: BasePlug[]) =>
    setPolicy((prev) => ({ ...prev, offPlugs }));

  // Add/edit policy
  const editPolicy = (
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
  console.log(policy);

  // Create the policy
  const createPolicy = async () => {
    const newPolicy: PolicyCreateDTO = {
      isActive: true,
      name: name,
      offPlugIds: offPlugs.map((plug) => plug.id),
      onPlugIds: onPlugs.map((plug) => plug.id),
      powerSourceId: powerSourceId ?? null,
      tempGreaterThan,
      tempLessThan,
    };

    try {
      await api.post<PolicyCreateDTO>("/policy", {
        ...newPolicy,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Heading variant="h2" hasBackButton={true}>
        {isCreating ? headingText : name}
      </Heading>
      <View style={{ rowGap: spaces.md }}>
        {!isCreating && (
          <FeatureRow
            headingText="Current State"
            hasSwitch
            status={isActive}
            setStatus={() => {}} // TODO: add this function
          />
        )}
        {isCreating && (
          <AppTextInput
            label="Policy Name"
            value={name}
            onChange={updateName}
            containerStyle={{ marginTop: spaces.md }}
            // hasError={error?.component === "name"}
          />
        )}
        <PolicyConditions
          powerSourceId={policy.powerSourceId}
          tempLessThan={policy.tempLessThan}
          tempGreaterThan={policy.tempGreaterThan}
          editPolicy={editPolicy}
        />
        <SchedulePlugsList
          onPlugs={onPlugs}
          offPlugs={offPlugs}
          updateOnPlugs={updateOnPlugs}
          updateOffPlugs={updateOffPlugs}
          containerStyles={{ zIndex: -1 }}
        />
        {isCreating && (
          <Button
            text="Create New Policy"
            onPress={createPolicy}
            invertColors={true}
          />
        )}
      </View>
    </View>
  );
}
