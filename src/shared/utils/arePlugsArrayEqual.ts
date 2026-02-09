import { BasePlug } from "@/src/shared/types/BasePlug";

export function arePlugArraysEqual(
  plugArray1: BasePlug[],
  plugArray2: BasePlug[],
): boolean {
  if (plugArray1.length !== plugArray2.length) return false;

  return plugArray1.every((plug, idx) => {
    const otherPlug = plugArray2[idx];

    return (
      plug.id === otherPlug.id &&
      plug.name === otherPlug.name &&
      plug.isOn === otherPlug.isOn
    );
  });
}
