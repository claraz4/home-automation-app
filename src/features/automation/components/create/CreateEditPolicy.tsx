import { View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import FeatureRow from "@/src/shared/components/FeatureRow";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { colors, spaces } from "@/src/theme";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import usePolicies from "@/src/features/automation/hooks/usePolicies";
import { arePoliciesEqual } from "@/src/features/automation/utils/policiesHelper";
import AppActivityIndicator from "@/src/shared/ui/AppActivityIndicator";

interface CreateEditPolicyProps {
  headingText?: string;
  scrollToTop: () => void;
  setIsDeletePolicy?: (state: boolean) => void;
}

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

export default function CreateEditPolicy({
  scrollToTop,
  headingText,
  setIsDeletePolicy,
}: CreateEditPolicyProps) {
  const { mode } = useLocalSearchParams();
  const isCreating = mode === "create";

  const [error, setError] = useState<FormError | null>(null);
  const [loading, setLoading] = useState(false);
  const [extraError, setExtraError] = useState<string | null>(null);
  const [originalPolicy, setOriginalPolicy] = useState<PolicyDTO>(emptyPolicy);
  const [policy, setPolicy] = useState<PolicyDTO>(emptyPolicy);
  const [statusBoxProps, setStatusBoxProps] =
    useState<StatusBoxInfo>(statusBoxInfoClean);
  const { policyId } = useLocalSearchParams<{ policyId: string }>();

  // Get a single policy
  const fetchSinglePolicy = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getSinglePolicy(policyId);
      setPolicy(res);
      setOriginalPolicy(res);
    } catch (error) {
      setExtraError("An error occurred while fetching the policy.");
    } finally {
      setLoading(false);
    }
  }, [policyId]);

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
    setExtraError,
  });

  const {
    name,
    isActive,
    onPlugs,
    offPlugs,
    tempGreaterThan,
    tempLessThan,
    powerSourceId,
  } = policy;
  const isPolicyEdited = !arePoliciesEqual(policy, originalPolicy);

  const { getSinglePolicy } = usePolicies();

  useFocusEffect(
    useCallback(() => {
      if (policyId) {
        void fetchSinglePolicy();
      }
    }, []),
  );

  // Clear the error on change of policy
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

      {loading && <AppActivityIndicator />}

      {statusBoxProps.isVisible && (
        <StatusBox
          title={statusBoxProps.title}
          isError={statusBoxProps.isError}
          message={statusBoxProps.message}
          hasClose={true}
          onClose={() => setStatusBoxProps(statusBoxInfoClean)}
        />
      )}
      {extraError && (
        <StatusBox
          isError={true}
          message={extraError}
          hasClose={true}
          onClose={() => setExtraError(null)}
        />
      )}

      {!loading && (
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
            <View style={{ rowGap: spaces.sm, marginTop: spaces.sm }}>
              <Button
                text="Edit Policy"
                onPress={() => onEdit(policy)}
                invertColors={true}
                disabled={!isPolicyEdited || !isSaveEnabled}
              />
              {setIsDeletePolicy && (
                <Button
                  text="Delete Policy"
                  onPress={() => setIsDeletePolicy(true)}
                  textStyle={{ color: colors.status.fail }}
                />
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
