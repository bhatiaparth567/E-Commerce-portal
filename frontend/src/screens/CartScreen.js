import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../actions/cart";
import { Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import Message from "../components/Message";
import CartItem from "../components/CartItem";
import CartTotal from "../components/CartTotal";

function CartScreen(props) {
  const productId = props.match.params.id;
  let qty = props.location.search ? props.location.search.split("=")[1] : 1;
  qty = Number(qty);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addItemToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  let cartDisplay = (
    <Message>
      Your cart is empty <Link to="/"> Go Back</Link>
    </Message>
  );
  if (cartItems.length) cartDisplay = <ListGroup></ListGroup>;

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartDisplay}

        {cartItems.map((item) => (
          <CartItem key={item.product} item={item} />
        ))}
      </Col>
      <Col md={4}>
        <CartTotal cartItems={cartItems} history={props.history} />
      </Col>
    </Row>
  );
}

export default CartScreen;
