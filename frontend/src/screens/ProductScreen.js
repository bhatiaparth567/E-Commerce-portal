import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import "./ProductScreen.css";
import Rating from "../components/Rating";
import { fetchProduct } from "../actions/products";

function ProductScreen(props) {
  //gting the requested product from url
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  useEffect(() => {
    dispatch(fetchProduct(props.match.params.id));
  }, [dispatch, props.match]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="product-screen">
          <div className="product-image">
            <img src={product.image} />
          </div>
          <div className="product-details">
            <div className="product-name">
              <h3>{product.name}</h3>
            </div>
            <div className="border-bottom"></div>
            <div className="product-price">
              <h5>
                Price:
                <i className="fas fa-dollar-sign"> </i>
                {product.price}
              </h5>
            </div>
            <div className="border-bottom"></div>
            <div className="product-reviews">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
            <div className="border-bottom"></div>
            <div className="product-description">{product.description}</div>
          </div>
          <div className="product-actions">
            <div className="product-price d-flex py-2">
              <span>Price:</span>
              <span>
                <i className="fas fa-dollar-sign"> </i>
                {product.price}
              </span>
            </div>
            <div className="product-status d-flex py-2">
              <span>Status:</span>
              <span>
                {product.countInStock > 0 ? "In stock" : "Out of stock"}
              </span>
            </div>
            <div className="product-add-cart py-2">
              <Button
                className="btn-dark"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add to cart!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
