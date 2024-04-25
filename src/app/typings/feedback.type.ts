import { FormControl } from '@angular/forms';

export type FeedbackFilterForm = {
  status: FormControl<string>;
  min_date: FormControl<string>;
  max_date: FormControl<string>;
  skip: FormControl<number>;
  limit: FormControl<number>;
};
