export interface PlugDTO {
  id: number;
  name: string;
  isOn: boolean;
  isDeviceConnected: boolean;
  isConstant: boolean;
  currentConsumption: number;
  timeout: number | null;
  schedules: Schedule[];
}

export interface Schedule {
  id: number;
  // add fields when backend defines them
}
