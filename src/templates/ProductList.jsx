import React, { useEffect } from "react";
import { ProductCard } from "../components/Products";
import { useDispatch } from "react-redux";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state)
  const products = getProducts(selector)

  useEffect({
      dispatch(fetchProducts())
  },[])

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row"></div>
    </section>
  );
};

export default ProductList;
