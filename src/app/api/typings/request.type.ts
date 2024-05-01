import { FormValue, RequestFilterForm } from 'src/app/typings';

import { PaginationData } from './base.type';

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
