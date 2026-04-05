interface PowerSource {
  name: string;
  cost: number;
}

interface Day {
  day: string;
  powerSources: PowerSource[];
}

export interface WeeklyCostDTO {
  days: Day[];
}
