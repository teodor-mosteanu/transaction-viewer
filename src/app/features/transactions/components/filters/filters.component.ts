import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PaymentStatus } from '../../../../core/constants/app.constants';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonModule, CalendarModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter();
  startDay = new Date('2020-01-01');
  paymentStatuses = Object.values(PaymentStatus);
  today = new Date();
  filterFormGroup = new FormGroup({
    selectedStatus: new FormControl(),
    startDate: new FormControl(new Date('2021-01-01')),
    endDate: new FormControl(new Date(this.today)),
  });
  constructor() {}

  ngOnInit(): void {}
  filterTransactions() {
    this.filterChange.emit(this.filterFormGroup.value);
  }
}
