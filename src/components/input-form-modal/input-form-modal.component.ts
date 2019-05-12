import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-form-modal',
  templateUrl: './input-form-modal.component.html',
  styleUrls: ['./input-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFormModalComponent implements OnInit {
  form: FormGroup;
  @Input() formData: any;
  @Output() collectFormData = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      // Item 1
      email: ['' || this.formData.email],
      // Item 2
      id: [''],
      // Item 3
      projectNumber: [''],
      // Item 4
      totalAreaM: [this.formData.totalAreaM],
      totalAreaFt: [this.formData.totalAreaFt],
      // Item 5
      occupants: [this.formData.occupants],
      // Item 6
      yearlyElectricity: [this.formData.yearlyElectricity],
      // Item 7
      gasInM: [this.formData.gasInM], // m3
      gasInKWh: [this.formData.gasInKWh],
      // Item 8
      oilInLt: [this.formData.oilInLt],
      oilInKWh: [this.formData.oilInKWh],
      // Item 9
      woodInkWh: [this.formData.woodInkWh],
      woodInM: [this.formData.woodInM],
      // Item 10
      onSiteRenewableElectricity: [this.formData.onSiteRenewableElectricity],
      // Item 11
      evaluationFromDate: [this.formData.evaluationFromDate],
      evaluationToDate: [this.formData.evaluationToDate],
      // Item 12
      hasOffsiteRenewableElectricity: [
        this.formData.hasOffsiteRenewableElectricity
      ],
      hasOffsiteRenewableNaturalGas: [
        this.formData.hasOffsiteRenewableNaturalGas
      ]
    });
  }

  convert(type: string, event) {
    const value = Number(event.target.value);
    // Item 4
    if (type === 'areaftToM') {
      this.form.controls.totalAreaM.setValue((value * 0.092903).toFixed(2));
    }
    if (type === 'areaMtoFt') {
      this.form.controls.totalAreaFt.setValue((value * 10.7639).toFixed(2));
    }
    // Item 7
    if (type === 'gasMtoKWh') {
      this.form.controls.gasInKWh.setValue((value * 10.3321).toFixed(2));
    }
    if (type === 'gasKWhToM') {
      this.form.controls.gasInM.setValue((value / 10.3321).toFixed(2));
    }
    // Item 8
    if (type === 'oilLtToKWh') {
      this.form.controls.oilInKWh.setValue((value * 10).toFixed(2));
    }
    if (type === 'oilKWhToLt') {
      this.form.controls.oilInLt.setValue((value / 10).toFixed(2));
    }
    // Item 9
    if (type === 'woodKWhToM') {
      this.form.controls.woodInM.setValue((value / 1000).toFixed(2));
    }
    if (type === 'woodMToKWh') {
      this.form.controls.woodInkWh.setValue((value * 1000).toFixed(2));
    }
  }

  submit() {
    const payload = {
      email: this.form.get('email').value,
      id: this.form.get('id').value,
      projectNumber: this.form.get('projectNumber').value,
      totalAreaM: Number(this.form.get('totalAreaM').value),
      totalAreaFt: Number(this.form.get('totalAreaFt').value),
      occupants: Number(this.form.get('occupants').value),
      yearlyElectricity: Number(this.form.get('yearlyElectricity').value),
      gasInM: Number(this.form.get('gasInM').value),
      gasInKWh: Number(this.form.get('gasInKWh').value),
      oilInLt: Number(this.form.get('oilInLt').value),
      oilInKWh: Number(this.form.get('oilInKWh').value),
      woodInkWh: Number(this.form.get('woodInkWh').value),
      woodInM: Number(this.form.get('woodInM').value),
      onSiteRenewableElectricity: Number(
        this.form.get('onSiteRenewableElectricity').value
      ),
      hasOffsiteRenewableElectricity: this.form.get(
        'hasOffsiteRenewableElectricity'
      ).value,
      hasOffsiteRenewableNaturalGas: this.form.get(
        'hasOffsiteRenewableNaturalGas'
      ).value,
      evaluationFromDate: this.form.get('evaluationFromDate').value,
      evaluationToDate: this.form.get('evaluationToDate').value,
      dataCollected: new Date()
    };
    this.collectFormData.emit(payload);
  }

  onPrintForm() {}
  onEmailForm() {}
}
