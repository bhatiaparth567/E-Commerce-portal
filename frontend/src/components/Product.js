import React from "react";
import "./Product.css";
import Rating from "./Rating.js";

function Product({ product }) {
  return (
    <div>
      <a href={`/product/${product._id}`}>
        <div className="product-container">
          <div className="product-image-container">
            <img className="product-image" src={product.image} />
          </div>
          <div className="product-details-container">
            <span className="product-title">{product.name}</span>
            <div className="reviews-container">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
            <div className="product-price-container">
              <h4 className="product-price">
                <i className="fas fa-dollar-sign"></i>
                {product.price}
              </h4>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Product;
