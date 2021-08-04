import React from "react";
import no from "../../assets/img/no.png";
import Image from "../common/Image";
import "./stylenoneproduct.scss";
function NoneProduct(props) {
  return (
    <>
      <Image className="none-product" src={no} alt="none product" />
      <p className="message">Rất tiếc chúng tôi không tìm thấy sản phẩm!</p>
    </>
  );
}

export default NoneProduct;
