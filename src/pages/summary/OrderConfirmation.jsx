import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderConfirmation({ setOrderPhase }) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        // TODO: handle error here
      });
  }, []);

  if (!orderNumber) return <div>Loading</div>;

  function handleClick() {
    resetOrder();
    setOrderPhase('inProgress');
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}</p>
      <p style={{ fontSize: '25%' }}>
        as per our terms and conditions, nothing will happen now
      </p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  );
}
