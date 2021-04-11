import React from "react";
import products from "../products";
import Product from "../components/Product";

function Homescreen() {
  return (
    <div>
      <div style={styles} className="products-list">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
};

export default Homescreen;
