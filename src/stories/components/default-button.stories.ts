import { action } from '@storybook/addon-actions';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DefaultButtonComponent } from 'src/app/shared/components';

import { DefaultButton } from '../typings';

export default {
  parameters: {
    design: 'ngZorro',
    url: 'https://ng.ant.design/components/button',
    layout: 'centered',
    controls: {
      expanded: true,
      exclude: ['clicked'],
    },
  },
  component: DefaultButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [NzButtonModule],
    }),
  ],
  argTypes: {
    size: {
      description: 'Define sizes of button',
      options: ['small', 'default', 'large'],
      control: { type: 'inline-radio' },
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'NzSizeLDSType' },
      },
    },
    mode: {
      description: 'Define mode of button',
      control: { type: 'inline-radio' },
      options: ['primary', 'default', 'dashed', 'link', 'text'],
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'NzButtonType' },
      },
    },
    danger: {
      description: 'Toggle ghost state',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    blocked: {
      description: 'Toggle blocked state',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    ghost: {
      description: 'Toggle ghost state',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    loading: {
      description: 'Toggle loading state',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    block: {
      description: 'Toggle block state',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    clicked: { action: 'clicked' },
  },
  args: {
    size: 'default',
    mode: 'default',
    danger: false,
    blocked: false,
    ghost: false,
    loading: false,
    block: false,
  },
  render: (args: DefaultButton) => ({
    props: {
      ...args,
      onCLick: action('clicked'),
    },
    template: `
      <sili-default-button 
        ${argsToTemplate(args)} 
        (clicked)="onCLick()"
      >
        Your Text
      </sili-default-button>`,
  }),
} as Meta<DefaultButton>;

export const UI: StoryObj<DefaultButton> = {};
