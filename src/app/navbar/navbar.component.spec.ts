
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
        // Set up a testing module (like a fake Angular app)
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule],
      declarations: [NavbarComponent], // We declare what we're testing
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });
      /*
    TestBed - Creates a "fake Angular app" just for testing
    fixture - Gives us tools to test how the component looks and behaves
    component - Lets us call methods and check properties directly
    */

      // This runs before each test

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
        // Create the component in our test environment
    component = fixture.componentInstance;
        // Get the actual component instance
    fixture.detectChanges();
          // Trigger change detection (like when Angular updates the view)
  });

  it('should create', () => {
           // Check that our component exists
    expect(component).toBeTruthy();
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
  });
});