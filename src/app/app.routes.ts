import { Routes } from '@angular/router';
import { TransactionViewComponent } from './features/transactions/pages/transaction-view/transaction-view/transaction-view.component';
import { appTitle } from './core/constants/app.constants';

export const routes: Routes = [
  {
    path: '**',
    component: TransactionViewComponent,
    title: appTitle,
    pathMatch: 'full',
  },
];
