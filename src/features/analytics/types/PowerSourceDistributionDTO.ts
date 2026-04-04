interface PowerSourceDTO {
  name: string;
  percentage: number;
}

export interface PowerSourceDistributionDTO {
  powerSources: PowerSourceDTO[];
}
