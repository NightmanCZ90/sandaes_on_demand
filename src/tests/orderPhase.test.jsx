import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  userEvent.click(hotFudgeCheckbox);

  // find and click order button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sandae/i,
  });
  userEvent.click(orderSummaryButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('Hot fudge')).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // expect 'loading' to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText('loading');
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();

  // do we need to await anything to avoid test errors?
  await screen.findByRole('spinbutton', { name: 'Chocolate' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('toppings header is not on summary page if no toppings ordered', async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  // find and click order button
  const orderSummaryButton = screen.getByRole('button', {
    name: /order sandae/i,
  });
  userEvent.click(orderSummaryButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole('heading', {
    name: /toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});
