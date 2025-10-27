export function getMaxValue(data: { label: string; value: number }[]) {
  let max = 0;
  for (const item of data) {
    if (item.value > max) max = item.value;
  }
  return max;
}

export function getNextMultiple(multiple: number, value: number) {
  return Math.ceil(value / multiple) * multiple;
}
