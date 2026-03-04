import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe } from 'vitest';
import { InputText, InputTextProps } from '.';

type Props = Partial<InputTextProps>;

const makeInput = (p: Props = {}) => {
  return (
    <InputText
      labelText='label'
      placeholder='placeholder'
      type='text'
      disabled={false}
      required={true}
      readOnly={false}
      {...p}
    />
  );
};

const renderInput = (p?: Props) => {
  const renderResult = render(makeInput(p));
  const input = screen.getByRole('textbox') as HTMLInputElement;
  return { renderResult, input };
};

const input = (p?: Props) => renderInput(p).input;

describe('<InputText />', () => {
  describe('default behavior', () => {
    test('render with label', async () => {
      const el = input({ labelText: 'new label' });
      const label = screen.getByText('new label');
      expect(el).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    test('render with placeholder', async () => {
      const el = input({ placeholder: 'new placeholder' });
      expect(el).toHaveAttribute('placeholder', 'new placeholder');
    });

    test('render without placeholder', async () => {
      const el = input({ placeholder: undefined });
      expect(el).not.toHaveAttribute('placeholder');
    });

    test('render without label', async () => {
      input({ labelText: undefined });
      const label = screen.queryByRole('label');
      expect(label).not.toBeInTheDocument();
    });

    test('uses labelText as aria-label when possible', async () => {
      expect(input()).toHaveAttribute('aria-label', 'label');
    });

    test('uses placeholder as fallback for aria-label', async () => {
      expect(input({ labelText: undefined })).toHaveAttribute(
        'aria-label',
        'placeholder',
      );
    });

    test('displays the default value correctly', async () => {
      expect(input({ defaultValue: 'default value' })).toHaveValue(
        'default value',
      );
    });

    test('accepts other JSX props (name, maxLength)', async () => {
      const el = input({ name: 'input-name', maxLength: 10 });
      expect(el).toHaveAttribute('name', 'input-name');
      expect(el).toHaveAttribute('maxLength', '10');
    });
  });

  describe('accessibility', () => {
    test('does not display an error message by default', async () => {
      const el = input();
      expect(el).toHaveAttribute('aria-invalid', 'false');
      expect(el).not.toHaveAttribute('aria-describedby');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('does not mark the input as invalid by default', async () => {
      const el = input();
      expect(el).toHaveAttribute('aria-invalid', 'false');
    });

    test('displays an error message when `errorMessage` is provided', async () => {
      const errorMessage = 'This field is required';
      const el = input({ errorMessage });
      const error = screen.getByRole('alert');
      const errorId = error.getAttribute('id');
      expect(el).toHaveAttribute('aria-invalid', 'true');
      expect(el).toHaveAttribute('aria-describedby', errorId);
      expect(error).toBeInTheDocument();
    });
  });

  describe('interactive behavior', () => {
    test('updates the value as the user types', async () => {
      const user = userEvent.setup();
      const el = input();
      await user.type(el, 'Hello, world!');
      expect(el).toHaveValue('Hello, world!');
    });
  });

  describe('visual states', () => {
    test('applies visual classes when disabled', async () => {
      const el = input({ disabled: true });
      expect(el).toHaveClass('disabled:bg-slate-200 disabled:text-slate-400');
    });

    test('applies visual classes when readonly', async () => {
      const el = input({ readOnly: true });
      expect(el).toHaveClass('read-only:bg-slate-100');
    });

    test('applies error class (red ring) when invalid', async () => {
      const el = input({ errorMessage: 'Error message' });
      expect(el).toHaveClass('ring-red-500 focus:ring-red-700');
    });

    test('retains developer custom classes', async () => {
      const el = input({ className: 'custom-class' });
      expect(el).toHaveClass('custom-class');
    });
  });
});
