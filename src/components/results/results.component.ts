import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit, OnChanges {
  @Input() result: any;
  @Output() openModal = new EventEmitter<any>();

  constructor() {}

  ngOnChanges() {}
  ngOnInit() {}

  onOpenModal() {
    this.openModal.emit();
  }
}
