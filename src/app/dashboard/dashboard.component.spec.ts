import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DataServiceService } from '../data-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of, throwError } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dataService: DataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatProgressSpinnerModule],
      declarations: [DashboardComponent],
      providers: [DataServiceService]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataServiceService);
    fixture.detectChanges(); // triggers ngOnInit
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading flags true and empty data', () => {
    expect(component.users).toEqual([]);
    expect(component.posts).toEqual([]);
    expect(component.loadingUsers).toBeTrue();
    expect(component.loadingPosts).toBeTrue();
    expect(component.errorUsers).toBeNull();
    expect(component.errorPosts).toBeNull();
  });

 
  it('should load users successfully', () => {
    const mockUsers = [{ id: 1, name: 'Alice' }];
    spyOn(dataService , 'getApi1').and.returnValue(of(mockUsers));

    component.loadUsers();

    expect(component.users).toEqual(mockUsers);
    expect(component.loadingUsers).toBeFalse();
    expect(component.errorUsers).toBeNull();
  });


  it('should load posts successfully', () => {
    const mockPosts = [{ id: 101, title: 'Post Title' }];
    spyOn(dataService, 'getApi2').and.returnValue(of(mockPosts));

    component.loadPosts();

    expect(component.posts).toEqual(mockPosts);
    expect(component.loadingPosts).toBeFalse();
    expect(component.errorPosts).toBeNull();
  });


  it('should handle error when loading users', () => {
    spyOn(dataService, 'getApi1').and.returnValue(throwError(() => 'API error'));

    component.loadUsers();

    expect(component.users).toEqual([]);
    expect(component.loadingUsers).toBeFalse();
    expect(component.errorUsers).toEqual('Failed to load users');
  });


  it('should handle error when loading posts', () => {
    spyOn(dataService, 'getApi2').and.returnValue(throwError(() => 'API error'));

    component.loadPosts();

    expect(component.posts).toEqual([]);
    expect(component.loadingPosts).toBeFalse();
    expect(component.errorPosts).toEqual('Failed to load posts');
  });
});

/*
spyOn
Calls a fake method instead of the real one
Returns some data you provide
Checks how many times the method is called
*/