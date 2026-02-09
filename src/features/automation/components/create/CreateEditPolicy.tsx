import { View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { useLocalSearchParams } from "expo-router";
import FeatureRow from "@/src/shared/components/FeatureRow";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { spaces } from "@/src/theme";
import { Dispatch, SetStateAction } from "react";
import { SchedulePlugsList } from "@/src/features/schedule/components/create/SchedulePlugsList";
import PolicyConditions from "@/src/features/automation/components/create/PolicyConditions";
import {
  PolicyCreateDTO,
  PolicyDTO,
} from "@/src/features/automation/types/PolicyDTO";
import Button from "@/src/shared/components/Button";
import { api } from "@/src/api/api";
import useCreateEditPolicy from "@/src/features/automation/hooks/useCreateEditPolicy";
import usePolicies from "@/src/features/automation/hooks/usePolicies";
import { arePoliciesEqual } from "@/src/features/automation/utils/policiesHelper";

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
  const { name, isActive, onPlugs, offPlugs } = policy;
  const { createPolicy, editPolicy } = usePolicies();

  const {
    updateName,
    updateOnPlugs,
    updateOffPlugs,
    editPolicyUI,
    toggleStatus,
  } = useCreateEditPolicy({ setPolicy, fetchSinglePolicy });

  // Create a policy
  const createNewPolicy = async () => {
    try {
      await createPolicy(policy);
    } catch (error) {
      console.error(error);
    }
  };

  // Edit a policy
  const editOldPolicy = async () => {
    try {
      await editPolicy(policy);
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
            status={policy.isActive}
            setStatus={() => toggleStatus(policy)}
            containerStyles={{ marginTop: spaces.md }}
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
            onPress={createNewPolicy}
            invertColors={true}
          />
        ) : (
          <Button
            text="Edit Policy"
            onPress={editOldPolicy} // TODO
            invertColors={true}
            disabled={!isScheduleEdited}
          />
        )}
      </View>
    </View>
  );
}
