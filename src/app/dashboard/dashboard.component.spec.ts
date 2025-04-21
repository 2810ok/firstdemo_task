import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DataServiceService } from '../data-service.service';
import { of, throwError } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockDataService: any;

  const mockUsers = [{ id: 1, name: 'John Doe' }];
  const mockPosts = [{ id: 101, title: 'Hello Post' }];

  beforeEach(() => {
    mockDataService = {
      getApi1: jasmine.createSpy('getApi1').and.returnValue(of(mockUsers)),
      getApi2: jasmine.createSpy('getApi2').and.returnValue(of(mockPosts))
    };

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: DataServiceService, useValue: mockDataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit and loadData
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users and posts', () => {
    expect(mockDataService.getApi1).toHaveBeenCalled();
    expect(mockDataService.getApi2).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
    expect(component.posts).toEqual(mockPosts);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should handle error if one API fails', () => {
    // Make getApi2 fail
    mockDataService.getApi2.and.returnValue(throwError(() => new Error('Oops')));

    // Manually reload data
    component.loadData();
    fixture.detectChanges();

    expect(component.loading).toBeFalse();

  });
});

/*
spyOn
Calls a fake method instead of the real one
Returns some data you provide
Checks how many times the method is called
*/