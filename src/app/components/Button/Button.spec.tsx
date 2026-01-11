import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from '.';

const VARIANT_DEFAULT_CLASSES = 'bg-blue-600 hover:bg-blue-700 text-blue-100';
const SIZE_DEFAULT_CLASSES =
  'text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2';

describe('<Button />', () => {
  describe('default props and JSX', () => {
    test('should render with default props (only children)', () => {
      // You can use this to debug what is being rendered
      // const rendered = render(<Button>Send Form</Button>);
      // rendered.debug();
      render(<Button>Send Form</Button>);
      const button = screen.getByRole('button', { name: /send form/i });
      // This line below is just an example, the screen.getByRole already throws if the element is not found
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(VARIANT_DEFAULT_CLASSES);
      expect(button).toHaveClass(SIZE_DEFAULT_CLASSES);

      // This is an example of snapshot testing, but it's usually better to test specific things, not the whole output,
      // since a small change in the component would break the snapshot test
      // expect(button).toMatchSnapshot();
    });

    test('should handle the built-in JSX props', async () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} type='submit' aria-hidden='false'>
          Example Button
        </Button>,
      );
      const button = screen.getByText(/example button/i);
      await userEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('variants', () => {
    test('default variant', () => {
      // Querying by title just for practice purposes, prefer getByRole in real tests
      render(
        <Button variant='default' title='default variant'>
          Send Form
        </Button>,
      );
      const button = screen.getByTitle('default variant');
      expect(button).toHaveClass(VARIANT_DEFAULT_CLASSES);
    });

    test('danger variant', () => {
      render(
        <Button variant='danger' title='danger variant'>
          Send Form
        </Button>,
      );
      const button = screen.getByTitle('danger variant');
      expect(button).toHaveClass('bg-red-600 hover:bg-red-700 text-red-100');
    });

    test('ghost variant', () => {
      render(
        <Button variant='ghost' title='ghost variant'>
          Send Form
        </Button>,
      );
      const button = screen.getByTitle('ghost variant');
      expect(button).toHaveClass(
        'bg-slate-300 hover:bg-slate-400 text-slate-950',
      );
    });
  });

  describe('sizes', () => {
    test('small size', () => {
      // Querying by test id just for practice purposes, prefer getByRole in real tests
      render(
        <Button size='sm' data-testid='small-button'>
          Send Form
        </Button>,
      );
      const button = screen.getByTestId('small-button');
      expect(button).toHaveClass(
        'text-xs/tight',
        'py-1',
        'px-2',
        'rounded-sm',
        '[&_svg]:w-3 [&_svg]:h-3 gap-1',
      );
    });

    test('medium size', () => {
      render(<Button size='md'>Send Form</Button>);
      const button = screen.getByRole('button', { name: /send form/i });
      expect(button).toHaveClass(SIZE_DEFAULT_CLASSES);
    });

    test('large size', () => {
      render(<Button size='lg'>Send Form</Button>);
      const button = screen.getByRole('button', { name: /send form/i });
      expect(button).toHaveClass(
        'text-lg/tight',
        'py-4',
        'px-6',
        'rounded-lg',
        '[&_svg]:w-5 [&_svg]:h-5 gap-3',
      );
    });
  });

  describe('disabled state', () => {
    test('should render disabled button', () => {
      render(<Button disabled>Send Form</Button>);
      const button = screen.getByRole('button', { name: /send form/i });
      expect(button).toBeDisabled();
      expect(button).toHaveClass(
        'disabled:bg-slate-200',
        'disabled:text-slate-400',
        'disabled:cursor-not-allowed',
      );
    });
  });
});
