import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const errors: ValidationErrors = {};

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      // Check if start date is at least tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      if (start < tomorrow) {
        errors['startDateTooEarly'] = {
          message: 'Start date must be at least tomorrow'
        };
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);

        // Check if end date is at least 7 days after start date
        const minEndDate = new Date(start);
        minEndDate.setDate(minEndDate.getDate());
        
        
        if (end < minEndDate) {
          errors['endDateTooEarly'] = {
            message: 'End date must be at least 7 days after start date'
          };
        }

        // Check if end date is not more than 1 year after start date
        const maxEndDate = new Date(start);
        maxEndDate.setFullYear(maxEndDate.getFullYear() + 1);
        
        if (end > maxEndDate) {
          errors['endDateTooLate'] = {
            message: 'End date cannot be more than 1 year after start date'
          };
        }
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}