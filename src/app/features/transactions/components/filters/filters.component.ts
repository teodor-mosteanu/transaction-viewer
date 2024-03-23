import { Component, EventEmitter, Output } from '@angular/core';
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
export class FiltersComponent {
  @Output() filterChange = new EventEmitter();
  minStartDate = new Date(new Date('1970-01-01'));
  paymentStatuses = Object.values(PaymentStatus);
  today = new Date();
  filterFormGroup = new FormGroup({
    selectedStatus: new FormControl(),
    startDate: new FormControl(new Date('2021-01-01')),
    endDate: new FormControl(new Date(this.today)),
  });

  filterTransactions() {
    this.filterChange.emit(this.filterFormGroup.value);
  }
}
