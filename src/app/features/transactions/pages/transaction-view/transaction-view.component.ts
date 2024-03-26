import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { PlaceholderComponent } from '../../components/placeholder/placeholder.component';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-transaction-view',
  standalone: true,
  imports: [TableModule, CommonModule, FiltersComponent, TableComponent, PlaceholderComponent],
  templateUrl: './transaction-view.component.html',
  styleUrl: './transaction-view.component.scss',
})
export class TransactionViewComponent {
  transactions: PaginatedTransactions | undefined = undefined;
  paymentTransactions: PaymentTransaction[];

  loading = false;
  currentPage = 0;

  createdDateAtStart: string | undefined = undefined;
  createdDateAtEnd: string | undefined = undefined;
  filterStatus: PaymentStatus | undefined = undefined;

  placeholderContent = {
    title: 'No filter selected',
    message: 'Begin by creating a filter to view transactions. Click apply with empty filters to get all data.',
  };

  constructor(private transactionsService: TransactionsService) {}

  setLoadingState(isLoading: boolean): void {
    this.loading = isLoading;
  }

  setPlaceholderContent(title: string, message: string): void {
    this.placeholderContent = { title, message };
  }

  getTransactions(): void {
    this.setLoadingState(true);
    this.transactionsService
      .getFilteredTransactions(
        this.currentPage,
        this.createdDateAtStart,
        this.createdDateAtEnd,
        this.filterStatus,
      )
      .pipe(
        catchError(error => {
          this.setLoadingState(false);
          this.setPlaceholderContent(
            'An error occurred',
            'An error occurred while fetching transactions. Please try again later.'
          );
          return of(null);
        })
      )
      .subscribe(data => {
        if (data && data.items.length === 0) {
          this.setPlaceholderContent(
            'No transactions found',
            'No transactions found with the selected filter'
          );
        } else if (data) {
          this.transactions = data;
          this.paymentTransactions = data.items;
          this.setLoadingState(false);
        }
      });
  }

  filterTransactions(filters: TransactionFilters): void {
    this.createdDateAtStart = filters.startDate?.toISOString().split('T')[0];
    this.createdDateAtEnd = filters.endDate?.toISOString().split('T')[0];
    this.filterStatus = filters.selectedStatus;
    this.currentPage = 0;
    this.getTransactions();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.getTransactions();
  }
}
