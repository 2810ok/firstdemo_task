import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, min, startWith } from 'rxjs/operators';
import { dateRangeValidator } from '../dateRangeValidator';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  title = "my";
  form: FormGroup;
  options: string[] = ['1234567890', '9876543210', '4567891230'];
  maxlengthd = 100;
  filteredOptions!: Observable<string[]>;
  minDate=new Date();
  
  maxDate: Date | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      input: ['', [Validators.required, Validators.maxLength(10)]],
      amount: ['', [Validators.required, Validators.minLength(2)]],
      repeatTransaction: [false],
      startDate: [null],
      endDate: [null],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(this.maxlengthd)]]
    }, { validators: dateRangeValidator() });

  console.log(this.maxDate);
  }

  
  

  ngOnInit() {
    this.filteredOptions = this.form.get('input')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => 
      option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }

  onCancel() {
    this.form.reset();
    this.form.get('repeatTransaction')?.setValue(false);
  }

  isDateInvalid(): boolean {
    const selectedDate = this.form.get('startDate')?.value;
    if (!selectedDate) return false;
    return new Date(selectedDate) <= this.minDate;
  }

  isMaxDateInvalid(): boolean {
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;
  
    if (!startDate || !endDate) return false; // Skip if dates are empty
  
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const maxValidDate = new Date(start); //if you put null it show error
    maxValidDate.setDate(start.getDate() + 7);
  
    return end < maxValidDate; // True if endDate > startDate + 7 days
    console.log(endDate);
  }

  
}