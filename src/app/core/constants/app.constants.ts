/* app title [TM 20/03/24] */
export const appTitle = 'Vyne | Transaction Management';

/* api auth details [TM 19/03/24] */
export const apiUsername = 'user';
export const apiPassword = 'userPass';

/* Get transactions URL [TM 20/03/24] */
export const transationApiUrl = 'http://localhost:8080/api/v1/payments';

/* default page size [TM 21/03/24] */
export const defaultPageSize = 5;

/* Default payment statuses [TM 21/03/24] */
export enum PaymentStatus {
  CAPTURED = 'CAPTURED',
  COMPLETED = 'COMPLETED',
  CREATED = 'CREATED',
  FAILED = 'FAILED',
  SETTLED = 'SETTLED',
}
