import { FormValue } from './base.type';
import { NZ_ICONS_TYPE } from './icons.type';

export type TableFieldType = 'text' | 'phone' | 'mail' | 'time' | 'status' | 'link';

export type CustomFilterType = 'search' | 'select' | 'multiSelect' | 'datePicker';

export type CustomFilterOption = {
  label: string;
  value: string | number;
};

export type CustomFilter = {
  type: CustomFilterType;
  icon: NZ_ICONS_TYPE;
  options?: CustomFilterOption[];
};

export type TableHeaderCol<F> = {
  name: string;
  fieldType: TableFieldType;
  field: string;
  control?: keyof FormValue<F>;
  isSort?: boolean;
  customFilters?: CustomFilter[];
};
