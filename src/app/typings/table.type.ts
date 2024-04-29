import { FormValue } from './base.type';
import { NZ_ICONS_TYPE } from './icons.type';

export type TableFieldType = 'text' | 'phone' | 'mail' | 'time' | 'status' | 'link';

export type CustomFilterType = 'search' | 'select' | 'multiSelect' | 'datePicker';

export type CustomFilter<O> = {
  type: CustomFilterType;
  icon: NZ_ICONS_TYPE;
  options?: O[];
};

export type TableHeaderCol<F = any, O = any> = {
  name: string;
  fieldType: TableFieldType;
  field: string;
  control?: keyof FormValue<F>;
  isSort?: boolean;
  customFilters?: CustomFilter<O>[];
};
