import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedTransactions } from '../../../core/interfaces/payment-transaction';
import { Observable } from 'rxjs';
import { LoggerService } from '../../../core/services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(
    private http: HttpClient,
    private loggerService: LoggerService,
  ) {}

  getTransactions(
    createdAtStart: string,
    createdAtEnd: string,
    page: number,
    size = 5,
  ): Observable<PaginatedTransactions> {
    const params = {
      createdAtStart,
      createdAtEnd,
      page: page.toString(),
      size: size.toString(),
    };
    this.loggerService.log('Fetching transactions');
    return this.http.get<PaginatedTransactions>(
      'http://localhost:8080/api/v1/payments',
      { params },
    );
  }
}
