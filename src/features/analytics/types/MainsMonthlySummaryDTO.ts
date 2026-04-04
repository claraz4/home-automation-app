export interface MainsMonthlySummaryDTO {
  totalConsumptionThisMonth: number;
  differenceFromLastMonth: number | null;
  totalCostThisMonth: number;
  costDifferenceFromLastMonth: number | null;
}
