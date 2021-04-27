import React from "react";
import { Button, Col, Image, ListGroup, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "../actions/cart";

function CartItem(props) {
  const dispatch = useDispatch();

  const onQtyChangHandler = (e) => {
    dispatch(addItemToCart(props.item.product, Number(e.target.value)));
  };
  const removeFromCartHandler = () => {
    dispatch(removeItemFromCart(props.item.product));
  };
  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <Image src={props.item.image} alt={props.item.name} fluid rounded />
        </Col>
        <Col md={3}>
          <Link to={`/products/${props.item.product}`}>{props.item.name}</Link>
        </Col>
        <Col md={2}>₹{props.item.price}</Col>
        <Col md={2}>
          <Form.Control
            as="select"
            default={1}
            value={props.item.qty}
            onChange={(e) => onQtyChangHandler(e)}
          >
            {[...Array(props.item.countInStock).keys()].map((x) => {
              return (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              );
            })}
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button type="button" variant="light" onClick={removeFromCartHandler}>
            <i className="fas fa-trash"> </i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default CartItem;
