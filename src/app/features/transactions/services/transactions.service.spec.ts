import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TransactionsService } from './transactions.service';
import { PaginatedTransactions } from '../../../core/interfaces/payment-transaction';
import { mockTransactions } from './transactions.service.mock';
import { LoggerService } from '../../../core/services/logger.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let mockLoggerService: jasmine.SpyObj<LoggerService>;
  let httpMock: HttpTestingController;
  let mockData: PaginatedTransactions = mockTransactions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TransactionsService,
        {
          provide: LoggerService,
          useValue: jasmine.createSpyObj('LoggerService', ['log']),
        },
      ],
    });
    service = TestBed.inject(TransactionsService);
    mockLoggerService = TestBed.inject(
      LoggerService,
    ) as jasmine.SpyObj<LoggerService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return paginated transactions', () => {
    const createdAtStart = '2022-01-01';
    const createdAtEnd = '2022-01-31';
    const page = 1;
    const size = 5;

    service
      .getTransactions(createdAtStart, createdAtEnd, page, size)
      .subscribe((transactions: PaginatedTransactions) => {
        expect(transactions).toEqual(mockData);
      });

    expect(mockLoggerService.log).toHaveBeenCalled();
    const request = httpMock.expectOne(
      request =>
        request.url === 'http://localhost:8080/api/v1/payments' &&
        request.params.get('createdAtStart') === createdAtStart &&
        request.params.get('createdAtEnd') === createdAtEnd &&
        request.params.get('page') === page.toString() &&
        request.params.get('size') === size.toString(),
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('createdAtStart')).toBe(createdAtStart);
    expect(request.request.params.get('createdAtEnd')).toBe(createdAtEnd);
    expect(request.request.params.get('page')).toBe(page.toString());
    expect(request.request.params.get('size')).toBe(size.toString());

    request.flush(mockData);
  });
});
