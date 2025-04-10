
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  title="my";
  form: FormGroup;
  options: string[] = ['1234567890', '9876543210', '4567891230'];
  maxlengthd=100;
  filteredOptions!: Observable<string[]>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      input: ['',[Validators.required,Validators.maxLength(10)]],
      amount: ['',[Validators.required,Validators.minLength(2)]],
      repeatTransaction: [false],
      startDate: [null],
      endDate: [null],
      description: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(this.maxlengthd)]]
    });
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
}