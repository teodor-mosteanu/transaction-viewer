import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionViewComponent } from './features/transactions/pages/transaction-view/transaction-view/transaction-view.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TransactionViewComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
