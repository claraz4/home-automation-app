import { api } from "@/src/api/api";
import {
  PolicyCreateDTO,
  PolicyDTO,
  PolicyEditDTO,
} from "@/src/features/automation/types/PolicyDTO";

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

  // Create the policy
  const createPolicy = async (policy: PolicyDTO) => {
    const newPolicy: PolicyCreateDTO = {
      isActive: true,
      name: policy.name,
      offPlugIds: policy.offPlugs.map((plug) => plug.id),
      onPlugIds: policy.onPlugs.map((plug) => plug.id),
      powerSourceId: policy.powerSourceId ?? null,
      tempGreaterThan: policy.tempGreaterThan,
      tempLessThan: policy.tempLessThan,
    };

    try {
      await api.post<PolicyCreateDTO>("/policy", {
        ...newPolicy,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Edit the policy
  const editPolicy = async (policy: PolicyDTO) => {
    if (!policy.id) {
      return;
    }

    const newPolicy: PolicyEditDTO = {
      name: policy.name,
      id: policy.id,
      offPlugIds: policy.offPlugs.map((plug) => plug.id),
      onPlugIds: policy.onPlugs.map((plug) => plug.id),
      powerSourceId: policy.powerSourceId ?? null,
      tempGreaterThan: policy.tempGreaterThan,
      tempLessThan: policy.tempLessThan,
    };

    try {
      await api.put<PolicyEditDTO>("/policy", {
        ...newPolicy,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getPolicies,
    getSinglePolicy,
    togglePolicy,
    createPolicy,
    editPolicy,
  };
}
