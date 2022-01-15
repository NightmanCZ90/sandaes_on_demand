import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
  });
});

test.only('button is disabled for no scoops', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderSummaryButton = screen.getByRole('button', {
    name: /order sandae/i,
  });
  expect(orderSummaryButton).toBeDisabled();

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '1');
  expect(orderSummaryButton).toBeEnabled();

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '0');
  expect(orderSummaryButton).toBeDisabled();
});
