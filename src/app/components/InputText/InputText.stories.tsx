import type { Meta, StoryObj } from '@storybook/react';
import { InputText } from '.';

const meta: Meta<typeof InputText> = {
  title: 'Components/Forms/InputText',
  component: InputText,
  decorators: [
    Story => (
      <div className='max-w-screen-lg mx-auto p-12'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'tel', 'url', 'search'],
      description: 'This defines the type of input element',
    },
    labelText: {
      control: 'text',
      description: 'The label of the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed to the user',
    },
    placeholder: {
      control: 'text',
      description: 'An example usage for the input',
    },
    required: {
      control: 'boolean',
      description: 'Field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Field is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read only field',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    type: 'text',
    labelText: 'Input Label',
    errorMessage: '',
    placeholder: 'Type something...',
    required: true,
    disabled: false,
    readOnly: false,
    defaultValue: 'This is the default value of the input',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errorMessage: 'This is the error message',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
};
