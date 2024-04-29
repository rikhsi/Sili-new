import { NzTableFilterList } from 'ng-zorro-antd/table';

import { FormValue } from './base.type';

export type TableFieldType = 'text' | 'phone' | 'mail' | 'time' | 'status' | 'link';

export type TableHeaderCol<F> = {
  name: string;
  fieldType: TableFieldType;
  field: string;
  control?: keyof FormValue<F>;
  isMultipleSort?: boolean;
  sortOptions?: NzTableFilterList;
};
