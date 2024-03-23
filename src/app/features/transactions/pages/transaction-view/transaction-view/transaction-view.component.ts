import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { PaymentStatus } from '../../../../../core/constants/app.constants';
import {
  PaginatedTransactions,
  PaymentTransaction,
} from '../../../../../core/interfaces/payment-transaction';
import { TransactionsService } from '../../../services/transactions.service';

@Component({
  selector: 'app-transaction-view',
  standalone: true,
  imports: [
    TableModule,
    CalendarModule,
    ReactiveFormsModule,
    CommonModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './transaction-view.component.html',
  styleUrl: './transaction-view.component.scss',
})
export class TransactionViewComponent implements OnInit {
  transactions: PaginatedTransactions | undefined = undefined;
  paymentTransactions: PaymentTransaction[];
  totalPages: number;
  loading = false;
  currentPage = 0;
  paymentStatuses = Object.values(PaymentStatus);
  today = new Date();
  startDay = new Date('2020-01-01');
  filterFormGroup = new FormGroup({
    selectedStatus: new FormControl(),
    startDate: new FormControl(new Date('2021-01-01')),
    endDate: new FormControl(new Date(this.today)),
  });

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    console.log(this.paymentStatuses);
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.loading = true;
    this.transactionsService.getAllTransactions().subscribe(data => {
      this.transactions = data;
      this.paymentTransactions = data.items;
      this.loading = false;
    });
  }

  getTransactions() {
    console.log('getTransactions');
    const startDateControl = this.filterFormGroup.get('startDate') || undefined;
    const endDateControl = this.filterFormGroup.get('endDate') || undefined;
    const filterStatus = this.filterFormGroup.get('selectedStatus');

    const createdDateAtStart = startDateControl?.value
      ?.toISOString()
      .split('T')[0];
    const createdDateAtEnd = endDateControl?.value?.toISOString().split('T')[0];

    this.loading = true;
    this.transactionsService
      .getFilteredTransactions(
        this.currentPage,
        createdDateAtStart,
        createdDateAtEnd,
        filterStatus?.value || undefined,
      )
      .subscribe(data => {
        this.transactions = data;
        this.paymentTransactions = data.items;
        this.loading = false;
      });
  }

  filterTransactions(): void {
    this.getTransactions();
  }

  changePage(event: TableLazyLoadEvent) {
    if (event.first !== undefined && event.first !== this.currentPage) {
      this.currentPage = event.first === 0 ? event.first : event.first / 5;
      this.getTransactions();
    }
  }
}
