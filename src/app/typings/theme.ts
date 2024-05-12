import { THEME } from '../constants';

export type ThemeType = {
  current: THEME;
  prev?: THEME;
};

export type ThemeItem = {
  name: string;
  theme: THEME;
  isSelected: boolean;
};
