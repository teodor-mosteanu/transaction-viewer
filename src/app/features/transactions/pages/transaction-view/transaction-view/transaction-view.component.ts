import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../services/transactions.service';

@Component({
  selector: 'app-transaction-view',
  standalone: true,
  imports: [],
  templateUrl: './transaction-view.component.html',
  styleUrl: './transaction-view.component.scss',
})
export class TransactionViewComponent implements OnInit {
  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    let abc = this.transactionsService
      .getTransactions('2021-01-01', '2021-12-31', 0)
      .subscribe(data => {
        console.log('data', data);
      });
    console.log('TransactionViewComponent', abc);
  }
}
