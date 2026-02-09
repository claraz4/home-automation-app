import { api } from "@/src/api/api";
import {
  PolicyCreateDTO,
  PolicyDTO,
  PolicyEditDTO,
} from "@/src/features/automation/types/PolicyDTO";
import { buildPolicyPayload } from "@/src/features/automation/utils/policiesHelper";
import { isAxiosError } from "axios";
import { isErrorDTO } from "@/src/shared/utils/errorHelpers";
import { DETAILS_TYPES, ERROR_TYPES } from "@/src/shared/types/ErrorDTO";
import { FormError } from "@/src/shared/errors/FormError";

export default function usePolicies() {
  // Get all policies
  const getPolicies = async () => {
    try {
      const res = await api.get("/policy");
      return res.data.policies;
    } catch (error) {
      console.error(error);
    }
  };

  // Get a single policy
  const getSinglePolicy = async (policyId: string) => {
    try {
      const res = await api.get(`/policy/${policyId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle policy state
  const togglePolicy = async (policyId: number, status: boolean) => {
    try {
      await api.put("/policy/toggle", { policyId, enable: status });
    } catch (error) {
      console.error(error);
    }
  };

  // Save policy
  const savePolicy = async (policy: PolicyDTO) => {
    const payload = buildPolicyPayload(policy);

    try {
      if (policy.id) {
        await api.put<PolicyEditDTO>("/policy", {
          ...payload,
          id: policy.id,
        });
      } else {
        await api.post<PolicyCreateDTO>("/policy", {
          ...payload,
          isActive: true,
        });
      }
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        const { data } = error.response;

        if (isErrorDTO(data) && data.type === ERROR_TYPES.ARGUMENT_EXCEPTION) {
          if (data.detail.includes(DETAILS_TYPES.DUPLICATE_POLICY_NAME)) {
            throw new FormError("name", data.detail);
          }
        }
      }
    }
  };
  return {
    getPolicies,
    getSinglePolicy,
    togglePolicy,
    savePolicy,
  };
}
