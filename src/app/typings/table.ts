import { NZ_ICONS_TYPE } from './icons';

export type TableFieldType =
  | 'text'
  | 'phone'
  | 'mail'
  | 'time'
  | 'status'
  | 'link'
  | 'payment'
  | 'checkStatus';

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

export type TableHeaderCol = {
  name: string;
  fieldType: TableFieldType;
  field: string;
  isSort?: boolean;
  customFilters?: CustomFilter[];
};
