import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./ProductScreen.css";
import Rating from "../components/Rating";
import products from "../products";

function ProductScreen(props) {
  //gting the requested product from url
  const product = products.find(
    (product) => product._id === props.match.params.id
  );
  return (
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
          <span>{product.countInStock > 0 ? "In stock" : "Out of stock"}</span>
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
  );
}

export default ProductScreen;
