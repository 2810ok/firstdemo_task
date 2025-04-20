import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TransactionComponent } from './transaction.component';
import { dateRangeValidator } from '../dateRangeValidator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatToolbarModule
      ],
      declarations: [TransactionComponent],
      providers: [FormBuilder],

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with correct controls', () => {
    expect(component.form.contains('input')).toBeTrue();
    expect(component.form.contains('amount')).toBeTrue();
    expect(component.form.contains('repeatTransaction')).toBeTrue();
    expect(component.form.contains('startDate')).toBeTrue();
    expect(component.form.contains('endDate')).toBeTrue();
    expect(component.form.contains('description')).toBeTrue();
  });

  it('should validate input field requirements', () => {
    const input = component.form.get('input');
    
    input?.setValue('');
    expect(input?.hasError('required')).toBeTrue();
    
    input?.setValue('12345678901');
    expect(input?.hasError('maxlength')).toBeTrue();
  });

  it('should validate amount field requirements', () => {
    const amount = component.form.get('amount');
    
    amount?.setValue('');
    expect(amount?.hasError('required')).toBeTrue();
    
    amount?.setValue('1');
    expect(amount?.hasError('minlength')).toBeTrue();
  });

  it('should validate description field requirements', () => {
    const description = component.form.get('description');
    
    description?.setValue('');
    expect(description?.hasError('required')).toBeTrue();
    
    description?.setValue('1234');
    expect(description?.hasError('minlength')).toBeTrue();
    
    
  });

  it('should validate date ranges correctly', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const invalidEndDate = new Date(tomorrow);
    invalidEndDate.setDate(tomorrow.getDate() + 6);
    const invalidFutureDate = new Date(tomorrow);
    invalidFutureDate.setFullYear(tomorrow.getFullYear() + 1);
    invalidFutureDate.setDate(tomorrow.getDate() + 1);

    //Test start date validation
    component.form.get('startDate')?.setValue(today);
    component.form.updateValueAndValidity();
    expect(component.form.hasError('startDateTooEarly')).toBeTrue();

    // Test end date validation
    component.form.get('startDate')?.setValue(tomorrow);
    component.form.get('endDate')?.setValue(invalidEndDate);
    component.form.updateValueAndValidity();
    expect(component.form.hasError('endDateTooEarly')).toBeTrue();

    // Test max date validation
    component.form.get('endDate')?.setValue(invalidFutureDate);
    component.form.updateValueAndValidity();
    expect(component.form.hasError('endDateTooLate')).toBeTrue();
  });

  it('should submit when form is valid', () => {
    spyOn(console, 'log');
    component.form.get('input')?.setValue('1234567890');
    component.form.get('amount')?.setValue('100');
    component.form.get('description')?.setValue('Valid description');
    
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Form submitted:', jasmine.any(Object));
  });

  it('should reset form values', () => {
    component.form.get('input')?.setValue('test');
    component.form.get('repeatTransaction')?.setValue(true);
    
    component.onCancel();
    
    expect(component.form.get('input')?.value).toBeNull();
    expect(component.form.get('repeatTransaction')?.value).toBeFalse();
  });
});