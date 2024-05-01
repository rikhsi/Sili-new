import { FormControl } from '@angular/forms';

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
