import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-input-form-modal',
  templateUrl: './input-form-modal.component.html',
  styleUrls: ['./input-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InputFormModalComponent implements OnInit {
  form: FormGroup;
  monthlyElectricity: FormGroup;
  leave:Subject<Boolean> = new Subject();totalElectricity: any;
;
  @Input() formData: any;
  @Output() collectFormData = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {}
  

  classes(leave: boolean) {
    return `modal-body scrollbar-style ${leave ? 'slideOut': 'slide'}`
  }

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
      yearlyElectricity: this.createYearlyForm(),
      totalYearlyElectricity:[this.formData.totalYearlyElectricity],
      // Item 7
      yearlyGas: this.createYearlyForm(),
      gasInM: [this.formData.gasInM], // m3
      gasInKWh: [this.formData.gasInKWh],
      // Item 8
      yearlyOil: this.createYearlyForm(),
      oilInLt: [this.formData.oilInLt],
      oilInKWh: [this.formData.oilInKWh],
      // Item 9
      yearlyWood: this.createYearlyForm(),
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

  createYearlyForm(){
    return this.formBuilder.group({
      jan:[this.formData.jan],
      feb:[this.formData.feb],
      mar:[this.formData.mar],
      apr:[this.formData.apr],
      may:[this.formData.may],
      jun:[this.formData.jun],
      jul:[this.formData.jul],
      aug:[this.formData.aug],
      sep:[this.formData.sep],
      oct:[this.formData.oct],
      nov:[this.formData.nov],
      dec:[this.formData.dec]
    })
  }

  sum(formGroupName:string){
    this.form.get(formGroupName).valueChanges.subscribe(value=>{
      let total = Object.values(value).reduce((a:number, b:number) => a + b, 0);
      if(formGroupName==="yearlyElectricity"){
        this.form.controls.totalYearlyElectricity.setValue(total);
      }
      if(formGroupName==="yearlyGas"){
        this.form.controls.gasInKWh.setValue(total);
        this.form.controls.gasInM.setValue((+total / 10.3321).toFixed(2));
      }
      if(formGroupName==="yearlyOil"){
        this.form.controls.oilInKWh.setValue(total);
        this.form.controls.oilInLt.setValue((+total / 10).toFixed(2));
      }
      if(formGroupName==="yearlyWood"){
        this.form.controls.woodInkWh.setValue(total);
        this.form.controls.woodInM.setValue((+total / 1000).toFixed(2));
      }
    })
    
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
      yearlyElectricity: Number(this.form.get('totalYearlyElectricity').value),
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
  
  onPrintForm() {  
    html2canvas(document.querySelector("#parentDiv")).then(canvas => {  
  
      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);  
  
      var imgData  = canvas.toDataURL("image/jpeg", 1.0);  
      pdf.addImage(imgData,0,0,canvas.width, canvas.height);  
      pdf.output('dataurlnewwindow'); 
  
  });  
  // formGroupName
}  
  onEmailForm() {}

}
