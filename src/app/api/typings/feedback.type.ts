import { FeedbackFilterForm, FormValue } from 'src/app/typings';

import { PaginationData } from './base.type';

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
