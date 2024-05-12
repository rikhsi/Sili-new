import { FormControl } from '@angular/forms';

import { FormValue, PaginationData } from './base';

export type ShopFilterForm = {
  name: FormControl<string>;
  phone: FormControl<string>;
  payment: FormControl<string>;
  location: FormControl<string>;
  active: FormControl<string>;
  min_date: FormControl<string>;
  max_date: FormControl<string>;
  skip: FormControl<number>;
  limit: FormControl<number>;
};

export type ShopData = FormValue<ShopFilterForm>;

export interface ShopItem {
  name: string;
  telephone_number: string;
  cash: boolean;
  swap: boolean;
  location: string;
  delivery: string;
  description: string;
  longitude: number;
  latitude: number;
  id: number;
  is_active: boolean;
  created_at: string;
}

export interface ShopResponse extends PaginationData {
  shops: ShopItem[];
}
