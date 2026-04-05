interface PowerSourceDTO {
  name: string;
  kwh: number;
  cost: number;
}

export interface MonthlyBillDTO {
  totalCost: number;
  powerSources: PowerSourceDTO[];
}
