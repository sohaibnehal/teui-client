import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputFormModalComponent } from '../../components';
import { AverageData, ConversionFactors } from '../../data';
import { CalculationData } from '../../interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  result: any;
  averageData: any;
  formData: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.averageData = AverageData;
    this.formData = AverageData;
    const calculationData = this.getData(AverageData);
    this.calculateResults(calculationData);
  }

  openModal() {
    const modalRef = this.modalService.open(InputFormModalComponent, {
      size: 'lg',beforeDismiss: async ()=>{
        modalRef.componentInstance.leave.next(true);
        return delay(500, true)
      }
    });
    modalRef.componentInstance.formData = this.formData;
    modalRef.componentInstance.collectFormData.subscribe((data: any) => {
      this.formData = data;
      const calculationData = this.getData(this.averageData, data);
      this.calculateResults(calculationData);
    });
  }

  getData(averageData, formData?) {
    return {
      yearlyElectricity:
        formData && formData.yearlyElectricity
          ? formData.yearlyElectricity
          : averageData.yearlyElectricity,
      onSiteRenewableElectricity:
        formData && formData.onSiteRenewableElectricity
          ? formData.onSiteRenewableElectricity
          : averageData.onSiteRenewableElectricity,
      hasOffsiteRenewableElectricity:
        formData && formData.hasOffsiteRenewableElectricity
          ? formData.hasOffsiteRenewableElectricity
          : averageData.hasOffsiteRenewableElectricity,
      bullfrogOffsiteRenewableOffset:
        averageData.bullfrogOffsiteRenewableOffset,
      yearlyGas:
        formData && formData.gasInM ? formData.gasInM : averageData.gasInM, // m3
      hasOffsiteRenewableNaturalGas:
        formData && formData.hasOffsiteRenewableNaturalGas
          ? formData.hasOffsiteRenewableNaturalGas
          : averageData.hasOffsiteRenewableNaturalGas,
      bullfrogNaturalGasOffsetValue: averageData.bullfrogNaturalGasOffsetValue,
      yearlyOil:
        formData && formData.oilInLt ? formData.oilInLt : averageData.oilInLt, // L
      yearlyWood:
        formData && formData.woodInkWh
          ? formData.woodInkWh
          : averageData.woodInkWh, // KWh
      projectArea:
        formData && formData.totalAreaM
          ? formData.totalAreaM
          : averageData.totalAreaM, // M2
      occupants:
        formData && formData.occupants
          ? formData.occupants
          : averageData.occupants // M2
    };
  }

  calculateResults(data: CalculationData) {
    const offSiteRenewableElectricity = data.hasOffsiteRenewableElectricity
      ? data.bullfrogOffsiteRenewableOffset
      : 0;
    const netElectricity =
      data.yearlyElectricity +
      data.onSiteRenewableElectricity +
      offSiteRenewableElectricity;
    const electricityCO2 =
      netElectricity * ConversionFactors.CO2FootprintElectricity;

    const annualNaturalGasOffset = data.hasOffsiteRenewableNaturalGas
      ? data.bullfrogNaturalGasOffsetValue
      : 0;
    const netNaturalGas = data.yearlyGas + annualNaturalGasOffset;
    const gasCO2 = netNaturalGas * ConversionFactors.CO2FootprintGas;

    const oilCO2 = data.yearlyOil * ConversionFactors.CO2FootprintOil;
    const totalCO2 = electricityCO2 + gasCO2 + oilCO2;
    const CO2PP = totalCO2 / data.occupants;

    // Per year
    const onSiteRenewableElecKWhM2 =
      data.onSiteRenewableElectricity / data.projectArea;
    const offSiteRenewableElecKWhM2 =
      offSiteRenewableElectricity / data.projectArea;
    const offSiteGreenNaturalGasKWhM2 =
      (annualNaturalGasOffset * ConversionFactors.naturalGasM3toKWh) /
      data.projectArea;
    const woodKWhM2 = data.yearlyWood / data.projectArea;
    const electricityKWhM2 = data.yearlyElectricity / data.projectArea;
    const gasKWhM2 =
      (data.yearlyGas * ConversionFactors.naturalGasM3toKWh) / data.projectArea;
    const oilKWhM2 =
      (data.yearlyOil * ConversionFactors.oilLtoKWh) / data.projectArea;

    const chartData = {
      energy: {
        woodKWhM2,
        electricityKWhM2,
        gasKWhM2,
        oilKWhM2
      },
      renewableEnergy: {
        onSiteRenewableElecKWhM2,
        offSiteRenewableElecKWhM2,
        offSiteGreenNaturalGasKWhM2
      }
    };
    const teui =
      onSiteRenewableElecKWhM2 +
      offSiteRenewableElecKWhM2 +
      offSiteGreenNaturalGasKWhM2 +
      woodKWhM2 +
      electricityKWhM2 +
      gasKWhM2 +
      oilKWhM2;
    this.result = { ...data, totalCO2, teui, chartData };
  }
}

function delay(t, v: true) {
  return new Promise<true>(function(resolve) { 
      setTimeout(resolve.bind(null, v), t)
  });
}