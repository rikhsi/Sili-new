import { TableFieldType } from '../typings';

export const LINK_NAME: Partial<{ [key in TableFieldType]: string }> = {
  phone: 'tel:',
  mail: 'mailTo:',
};
