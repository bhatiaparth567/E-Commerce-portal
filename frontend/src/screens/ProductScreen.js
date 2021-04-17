import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Image,
} from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";

import Rating from "../components/Rating";
import { fetchProduct } from "../actions/products";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);

  //gting the requested product from url
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(fetchProduct(props.match.params.id));
  }, [dispatch, props.match]);

  const onQtyChangHandler = (e) => {
    setQty(e.target.value);
  };
  const addToCartHandler = () => {
    props.history.push(`/cart/${props.match.params.id}/?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </Col>
            <Col md={3} className="mt-3">
              <ListGroup
                variant="flush"
                style={{ border: "1px solid #dfdfdf" }}
              >
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <i className="fas fa-dollar-sign"> </i>
                      {product.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <span>Status:</span>
                    </Col>
                    <Col>
                      <span>
                        {product.countInStock > 0 ? "In stock" : "Out of stock"}
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Row>
                          <Col>Qty:</Col>
                          <Col>
                            <Form.Control
                              style={{ width: "auto" }}
                              as="select"
                              value={qty}
                              onChange={(e) => onQtyChangHandler(e)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => {
                                  return (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  );
                                }
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Col style={{ textAlign: "center" }}>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-dark"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to cart!
                    </Button>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ProductScreen;
