export default function arrayToParams(
  value: string,
  items: string[] | number[] | undefined,
): URLSearchParams {
  const params = new URLSearchParams();

  items?.forEach((item) => {
    if (
      typeof item === "string" ||
      (typeof item === "number" && !isNaN(item))
    ) {
      params.append(value, item + "");
    }
  });

  return params;
}
