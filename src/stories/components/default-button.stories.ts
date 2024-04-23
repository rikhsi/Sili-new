import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NzButtonModule, NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { DefaultButtonComponent } from 'src/app/shared/components';

type DefaultButton = {
  size: NzSizeLDSType;
  danger: boolean;
  blocked: boolean;
  ghost: boolean;
  loading: boolean;
  mode: NzButtonType;
  block: boolean;
};

const argTypes = {
  size: {
    description: 'Define sizes of button',
    options: ['small', 'default', 'large'],
    control: { type: 'inline-radio' },
    table: {
      defaultValue: { summary: 'default' },
    },
  },
  danger: {
    description: 'Toggle danger state',
    control: { type: 'boolean' },
    table: {
      defaultValue: { summary: false },
    },
  },
  blocked: {
    description: 'Toggle blocked state',
    control: { type: 'boolean' },
    table: {
      defaultValue: { summary: false },
    },
  },
  ghost: {
    description: 'Toggle ghost state',
    control: { type: 'boolean' },
    table: {
      defaultValue: { summary: false },
    },
  },
  loading: {
    description: 'Toggle loading state',
    control: { type: 'boolean' },
    table: {
      defaultValue: { summary: false },
    },
  },
  mode: {
    description: 'Define mode of button',
    control: { type: 'inline-radio' },
    options: ['primary', 'default', 'dashed', 'link', 'text'],
    table: {
      defaultValue: { summary: 'default' },
    },
  },
  block: {
    description: 'Toggle block state',
    control: { type: 'boolean' },
    table: {
      defaultValue: { summary: false },
    },
  },
  clicked: {
    description: 'Output event of clicking',
  },
};

const meta: Meta<DefaultButton> = {
  tags: ['autodocs'],
  component: DefaultButtonComponent,
  argTypes: { ...argTypes },
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
    },
    actions: {
      handles: ['clicked'],
    },
  },
  decorators: [
    moduleMetadata({
      imports: [NzButtonModule],
    }),
  ],
  render: (args: DefaultButton) => ({
    props: {
      ...args,
    },
    template: `<sili-default-button ${argsToTemplate(args)}>Your Text</sili-default-button>`,
  }),
};

export const Default: StoryObj<DefaultButton> = {};
export default meta;
