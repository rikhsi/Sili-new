import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DefaultButtonComponent } from 'src/app/shared/components';

export default {
  title: 'Shared/Default Button',
  component: DefaultButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [NzButtonModule], // Убедитесь, что NzButtonModule импортирован
    }),
  ],
};

export const Simple = () => ({
  component: DefaultButtonComponent,
  props: {
    size: 'large',
    danger: false,
    blocked: false,
    ghost: false,
    loading: false,
    mode: 'default',
    block: false,
    clicked: action('Button clicked'),
  },
});

export const Blocked = () => ({
  component: DefaultButtonComponent,
  props: {
    size: 'default',
    danger: false,
    blocked: true,
    ghost: false,
    loading: false,
    mode: 'default',
    block: false,
    clicked: action('Button clicked'),
  },
});

export const Danger = () => ({
  component: DefaultButtonComponent,
  props: {
    size: 'small',
    danger: true,
    blocked: false,
    ghost: false,
    loading: false,
    mode: 'default',
    block: false,
    clicked: action('Button clicked'),
  },
});

export const Loading = () => ({
  component: DefaultButtonComponent,
  props: {
    size: 'large',
    danger: false,
    blocked: false,
    ghost: false,
    loading: true,
    mode: 'default',
    block: false,
    clicked: action('Button clicked'),
  },
});
