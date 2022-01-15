import { useOrderDetails } from '../../contexts/OrderDetails';
import { Button } from 'react-bootstrap';
import Options from './Options';

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1>Design Your Sandae!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase('review')}>Order Sandae!</Button>
    </div>
  );
}
