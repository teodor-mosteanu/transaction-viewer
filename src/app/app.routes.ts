import { Routes } from '@angular/router';
import { TransactionViewComponent } from './features/transactions/pages/transaction-view/transaction-view/transaction-view.component';

export const routes: Routes = [
  {
    path: '**',
    component: TransactionViewComponent,
    title: 'Transaction View',
    pathMatch: 'full',
  },
];
