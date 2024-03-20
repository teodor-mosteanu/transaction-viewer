import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionViewComponent } from './features/transactions/pages/transaction-view/transaction-view/transaction-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TransactionViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vyne-tech-test';
}
