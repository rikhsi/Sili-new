import { FormControl } from '@angular/forms';

import { FormValue, PaginationData } from './base';

export type RequestFilterForm = {
  phone: FormControl<string>;
  name: FormControl<string>;
  configuration: FormControl<string>;
  shop_name: FormControl<string>;
  status: FormControl<string>;
  min_date: FormControl<string>;
  max_date: FormControl<string>;
  skip: FormControl<number>;
  limit: FormControl<number>;
  car_name: FormControl<string>;
};

export type RequestData = FormValue<RequestFilterForm>;

export interface RequestItem {
  id: number;
  name: string;
  telephone_number: string;
  status: string;
  configuration: string;
  car_name: string;
  shop_name: string;
  created_at: string;
}

export interface RequestResponse extends PaginationData {
  applications: RequestItem[];
}
