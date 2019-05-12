export interface CalculationData {
  yearlyElectricity: number; // KWh
  onSiteRenewableElectricity: number; // KWh,
  hasOffsiteRenewableElectricity: boolean;
  bullfrogOffsiteRenewableOffset: number;
  yearlyGas: number; // m3
  hasOffsiteRenewableNaturalGas: boolean;
  bullfrogNaturalGasOffsetValue: number;
  yearlyOil: number; // L
  yearlyWood: number; // KWh
  projectArea: number; // m2
  occupants: number;
}
