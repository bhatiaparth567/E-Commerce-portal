import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchProduct, reviewProduct } from "../actions/products";
import { REVIEW_CREATE_RESET } from "../actions/actionTypes";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //gting the requested product from url
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReview = useSelector((state) => state.productReview);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productReview;

  useEffect(() => {
    if (successReview) {
      alert("Added the review!");
      setRating(0);
      setComment("");
      dispatch({
        type: REVIEW_CREATE_RESET,
      });
    }
    dispatch(fetchProduct(props.match.params.id));
  }, [dispatch, props.match, successReview]);

  const onQtyChangHandler = (e) => {
    setQty(e.target.value);
  };
  const addToCartHandler = () => {
    props.history.push(`/cart/${props.match.params.id}/?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(reviewProduct(props.match.params.id, { rating, comment }));
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
              <ListGroup.Item>Price: {product.price}</ListGroup.Item>
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
                    <Col>₹{product.price}</Col>
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

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{new Date(review.createdAt).toDateString()}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a review!</h2>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>Please sign in to write a review</Message>
                  )}
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
