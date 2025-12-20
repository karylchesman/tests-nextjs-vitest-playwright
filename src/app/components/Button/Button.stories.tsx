import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta = {
  component: Button,
  decorators: [Story => <Story />],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Olá mundo!',
    variant: 'default',
    size: 'md',
  },
  render: args => (
    <div className='flex items-center justify-center min-h-[100px] bg-slate-100 p-4'>
      <Button {...args} />
    </div>
  ),
};

export const Ghost: Story = {
  args: {
    children: 'Olá mundo!',
    variant: 'ghost',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    children: 'Olá mundo!',
    variant: 'danger',
    size: 'md',
  },
};
