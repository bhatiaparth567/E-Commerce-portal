import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

function CartTotal({ cartItems, history }) {
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h4>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            items
          </h4>
          $
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            type="button"
            className="btn-block"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default CartTotal;
