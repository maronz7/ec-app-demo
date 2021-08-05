import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import { makeStyles } from "@material-ui/styles";
import { CartListItem } from "../components/Products";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { PrimaryButton, TextDetail } from "../components/UIkit";

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      width: 512,
    },
  },
  orderBox: {
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 4,
    boxShadow: "0 4px 2px 2px rgba(0,0,0,0.2)",
    height: 256,
    width: 288,
    margin: "24px auto 16px 0",
    padding: 16,
  },
}));

const OrderConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);

  const subTotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => (sum += product.price), 0);
  }, [productsInCart]);

  const shippingFee = subTotal > 10000 ? 210 : 0;
  const tax = subTotal * 0.1;
  const total = subTotal + shippingFee + tax;

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List className={classes.detailBox}>
            {productsInCart.length > 0 &&
              productsInCart.map((product) => (
                <CartListItem product={product} key={product.cartId} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label={"商品合計"}
            value={"¥" + subTotal.toLocaleString()}
          />
          <TextDetail label={"消費税"} value={"¥" + tax} />
          <TextDetail
            label={"送料"}
            value={"¥" + shippingFee.toLocaleString()}
          />
          <Divider />
          <TextDetail
            label={"合計（税込）"}
            value={"¥" + total.toLocaleString()}
          />
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;
