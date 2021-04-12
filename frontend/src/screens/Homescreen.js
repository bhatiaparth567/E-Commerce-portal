import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions/products";

import Product from "../components/Product";

function Homescreen() {
  const dispatch = useDispatch();
  var { loading, products, error } = useSelector((state) => state.productsList);

  //we cant make this arrow func async so inside make a new func
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  //the 2nd param of useEffect is a list of dependencies

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
