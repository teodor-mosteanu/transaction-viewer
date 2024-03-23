import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import {
  PaginatedTransactions,
  PaymentTransaction,
} from '../../../../core/interfaces/payment-transaction';
import { CommonModule } from '@angular/common';
import { defaultPageSize } from '../../../../core/constants/app.constants';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() loading: boolean;
  @Input() transactions: PaginatedTransactions | undefined = undefined;
  @Input() paymentTransactions: PaymentTransaction[];
  private _pageToShow: number;
  @Input()
  set pageToShow(value: number) {
    this._pageToShow = value * defaultPageSize;
  }

  get pageToShow(): number {
    return this._pageToShow;
  }
  @Output() pageChange = new EventEmitter<number>();
  currentPage = 0;

  changePage(event: TableLazyLoadEvent) {
    if (event.first !== undefined && event.rows) {
      const page = event.first === 0 ? 0 : event.first / event.rows;
      if (page !== this.currentPage) {
        this.currentPage = page;
        this.pageChange.emit(this.currentPage);
      }
    }
  }
}
