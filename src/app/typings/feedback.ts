import { FormControl } from '@angular/forms';

import { FormValue, PaginationData } from './base';

export type FeedbackFilterForm = {
  status: FormControl<string>;
  min_date: FormControl<string>;
  max_date: FormControl<string>;
  skip: FormControl<number>;
  limit: FormControl<number>;
};

export type FeedbackData = FormValue<FeedbackFilterForm>;

export interface FeedbackItem {
  name: string;
  telephone_number: string;
  status: string;
  id: number;
  created_at: string;
}

export interface FeedbackResponse extends PaginationData {
  requests: FeedbackItem[];
}
