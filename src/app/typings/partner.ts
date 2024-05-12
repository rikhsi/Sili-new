import { FormControl } from '@angular/forms';

import { FormValue, PaginationData } from './base';

export type PartnersFilterForm = {
  shop: FormControl<string>;
  phone: FormControl<string>;
  name: FormControl<string>;
  status: FormControl<string>;
  min_date: FormControl<string>;
  max_date: FormControl<string>;
  skip: FormControl<number>;
  limit: FormControl<number>;
};

export type PartnersData = FormValue<PartnersFilterForm>;

export interface Partner {
  name: string;
  shop_name: string;
  telephone_number: string;
  message: string;
  status: string;
  id: number;
  created_at: string;
}

export interface PartnersResponse extends PaginationData {
  partners: Partner[];
}
