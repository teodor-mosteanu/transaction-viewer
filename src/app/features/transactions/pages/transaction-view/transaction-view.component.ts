import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaymentStatus } from '../../../../core/constants/app.constants';
import {
  PaginatedTransactions,
  PaymentTransaction,
} from '../../../../core/interfaces/payment-transaction';
import { FiltersComponent } from '../../components/filters/filters.component';
import { TableComponent } from '../../components/table/table.component';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionFilters } from '../../interfaces/filters.interface';

@Component({
  selector: 'app-transaction-view',
  standalone: true,
  imports: [TableModule, CommonModule, FiltersComponent, TableComponent],
  templateUrl: './transaction-view.component.html',
  styleUrl: './transaction-view.component.scss',
})
export class TransactionViewComponent implements OnInit {
  transactions: PaginatedTransactions | undefined = undefined;
  paymentTransactions: PaymentTransaction[];

  loading = false;
  currentPage = 0;

  createdDateAtStart: string | undefined = undefined;
  createdDateAtEnd: string | undefined = undefined;
  filterStatus: PaymentStatus | undefined = undefined;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
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
    this.loading = true;
    this.transactionsService
      .getFilteredTransactions(
        this.currentPage,
        this.createdDateAtStart,
        this.createdDateAtEnd,
        this.filterStatus,
      )
      .subscribe(data => {
        this.transactions = data;
        this.paymentTransactions = data.items;
        this.loading = false;
      });
  }

  filterTransactions(filters: TransactionFilters): void {
    this.createdDateAtStart = filters.startDate?.toISOString().split('T')[0];
    this.createdDateAtEnd = filters.endDate?.toISOString().split('T')[0];
    this.filterStatus = filters.selectedStatus;
    this.currentPage = 0;
    this.getTransactions();
  }

  changePage(event: number) {
    this.currentPage = event;
    this.getTransactions();
  }
}
