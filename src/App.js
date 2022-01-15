import { useState } from 'react';
import { Container } from 'react-bootstrap';

import OrderEntry from './pages/entry/OrderEntry';
import OrderConfirmation from './pages/summary/OrderConfirmation';
import OrderSummary from './pages/summary/OrderSummary';

import { OrderDetailsProvider } from './contexts/OrderDetails';

export default function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>
        <Component setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>
  );
}
