import { render, screen } from '@testing-library/react';
import { Button } from '.';

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
      expect(button).toHaveClass('bg-blue-600 hover:bg-blue-700 text-blue-100');
      expect(button).toHaveClass(
        'text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2',
      );

      // This is an example of snapshot testing, but it's usually better to test specific things, not the whole output,
      // since a small change in the component would break the snapshot test
      // expect(button).toMatchSnapshot();
    });

    // test('should handle the built-in JSX props', () => {});
  });

  // describe('variants', () => {
  //   test('default variant', () => {});

  //   test('danger variant', () => {});

  //   test('ghost variant', () => {});
  // });

  // describe('sizes', () => {
  //   test('small size', () => {});

  //   test('medium size', () => {});

  //   test('large size', () => {});
  // });

  // describe('disabled state', () => {
  //   test('should render disabled button', () => {});
  // });
});
