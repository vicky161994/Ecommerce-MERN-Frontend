import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearOrderDetail } from "../actions/orderActions";

function OrderDetail() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearOrderDetail());
    // dispatch(clearCartList());
  }, [dispatch]);
  return <div>order detail page here</div>;
}

export default OrderDetail;
