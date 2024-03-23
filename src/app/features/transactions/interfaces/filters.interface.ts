import { PaymentStatus } from '../../../core/constants/app.constants';

export interface TransactionFilters {
  startDate?: Date;
  endDate?: Date;
  selectedStatus?: PaymentStatus;
}
