import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataServiceService } from './data-service.service';
//TestBed is Angular's primary testing utility that helps create a test environment
//HttpClientTestingModule replaces the real HttpClient for testing
//HttpTestingController lets us intercept and mock HTTP requests
describe('DataServiceService', () => {
  let service: DataServiceService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
     providers:[DataServiceService]
    });
    service = TestBed.inject(DataServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should fetch users from API 1', () => {
    // 1. Setup mock data
    const mockUsers = [{ id: 1, name: 'John' }];
    
    // 2. Call the service method
    service.getApi1().subscribe(users => {
       // 4. This runs AFTER you flush mock data
      expect(users).toEqual(mockUsers);
    });

// 2. Angular INTERCEPTS the call here
//    (No real HTTP request is made)
  const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
  
  // 4. Verify request details
  expect(req.request.method).toBe('GET');
  
// 5. YOU provide mock response
req.flush(mockUsers); // ← This triggers the subscribe
  })
});
/*
Step-by-Step Flow in Your Test
You prepare test data (mockUsers)

You call the API (getApi1())

Angular intercepts the request and gives you control (req)

You verify the request was properly formed

You send back mock data (flush())

Your service receives this mock data

Your subscription callback runs and verifies the data*/
