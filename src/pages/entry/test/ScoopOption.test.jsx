import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test('red input box for invalid scoop count', () => {
  render(
    <ScoopOption
      name='Chocolate'
      imagePath='/images/chocolate.png'
      updateItemCount={jest.fn()}
    />
  );

  const chocolateInput = screen.getByRole('spinbutton', { name: 'Chocolate' });

  // negative number
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '-2');
  expect(chocolateInput).toHaveClass('is-invalid');

  // decimal number
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2.5');
  expect(chocolateInput).toHaveClass('is-invalid');

  // too high
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '11');
  expect(chocolateInput).toHaveClass('is-invalid');

  // replace with valid input
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '3');
  expect(chocolateInput).not.toHaveClass('is-invalid');
});
