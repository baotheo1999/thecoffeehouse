import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ModalOrder from "../../../conponents/ModalOrder";
import { addListProductOrder } from "../../../redux/actions/order";
function OrderProduct({ infoProductSelect, closeModalOrderClick }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState(infoProductSelect.variants[0]);
  const [topping, setTopping] = useState({
    code: [],
    name: "",
    price: 0,
  });
  const [note, setNote] = useState("");

  const handlePlusAmount = () => {
    setAmount(amount + 1);
  };

  const handleMinusAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  const handleProductSizeChange = (data) => {
    setSize(data);
  };

  const handleProductToping = (e, item, index) => {
    const check = e.target.checked;
    if (check === true) {
      const codeTopping = [...topping.code];
      codeTopping.splice(index, 0, item.code);
      const data = {
        code: codeTopping,
        name: topping.name.concat(` ${item.product_name} +`),
        price: topping.price + item.price,
      };
      setTopping(data);
    } else {
      const data = {
        code: topping.code.filter((i) => i !== item.code),
        name: topping.name.replace(` ${item.product_name} +`, ""),
        price: topping.price - item.price,
      };
      setTopping(data);
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleAddToCartClick = () => {
    const product = {
      product_name: infoProductSelect.product_name,
      image: infoProductSelect.image,
      topping_list: infoProductSelect.topping_list,
      variants: infoProductSelect.variants,
      //active
      topping: topping,
      size: size,
      amount: amount,
      note: note,
      codeTopping: topping.code.filter((item) => typeof item !== "object"),
      totalPrice: amount * (size.price + topping.price),
    };
    dispatch(addListProductOrder(product));
  };

  useEffect(() => {
    if (
      infoProductSelect.topping !== undefined &&
      infoProductSelect.size !== undefined &&
      infoProductSelect.amount !== undefined &&
      infoProductSelect.note !== undefined
    ) {
      setTopping(infoProductSelect.topping);
      setSize(infoProductSelect.size);
      setAmount(infoProductSelect.amount);
      setNote(infoProductSelect.note);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalOrder
      closeModalOrderClick={closeModalOrderClick}
      amount={amount}
      handlePlusAmount={handlePlusAmount}
      handleMinusAmount={handleMinusAmount}
      infoProductSelect={infoProductSelect}
      size={size}
      handleProductSizeChange={handleProductSizeChange}
      topping={topping}
      handleProductToping={handleProductToping}
      handleAddToCartClick={handleAddToCartClick}
      note={note}
      handleNoteChange={handleNoteChange}
    />
  );
}

export default OrderProduct;
