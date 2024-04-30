import { FormValue, PartnersFilterForm } from 'src/app/typings';

import { PaginationData } from './base.type';

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
