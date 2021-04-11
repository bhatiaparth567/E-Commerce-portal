import React, { useEffect, useState } from "react";
import axios from "axios";

import Product from "../components/Product";

function Homescreen() {
  const [products, setProducts] = useState([]);
  //we cant make this arrow func async so inside make a new func
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/v1/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);
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
