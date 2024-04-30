import { FormControl } from '@angular/forms';

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
