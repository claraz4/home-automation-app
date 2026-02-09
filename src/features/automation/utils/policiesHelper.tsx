import { PolicyDTO } from "@/src/features/automation/types/PolicyDTO";
import { arePlugArraysEqual } from "@/src/shared/utils/arePlugsArrayEqual";

export const arePoliciesEqual = (policy1: PolicyDTO, policy2: PolicyDTO) => {
  if (!haveSameKeys(policy1, policy2)) return false;

  if (policy1.name !== policy2.name) return false;
  if (policy1.id !== policy2.id) return false;
  if (policy1.isActive !== policy2.isActive) return false;
  if (policy1.numOfPlugs !== policy2.numOfPlugs) return false;
  if (policy1.tempLessThan !== policy2.tempLessThan) return false;
  if (policy1.tempGreaterThan !== policy2.tempGreaterThan) return false;
  if (policy1.powerSourceId !== policy2.powerSourceId) return false;
  if (policy1.powerSourceName !== policy2.powerSourceName) return false;

  return (
    arePlugArraysEqual(policy1.onPlugs, policy2.onPlugs) &&
    arePlugArraysEqual(policy1.offPlugs, policy2.offPlugs)
  );
};

const haveSameKeys = (a: object, b: object): boolean => {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => key in b);
};
