import React from "react";
import Input from "../../conponents/common/Input";
import ProductItem from "./ProductItem";
import NoneProduct from "../../conponents/NoneProduct";
import "./styleBodyCenter.scss";
function BodyCenter({
  listData,
  searchText,
  handleSearchProductChange,
  listFilterProduct,
}) {
  return (
    <div className="body-center">
      <Input
        className="search-menu"
        type="text"
        placeholder="Tìm kiếm sản phẩm"
        value={searchText}
        onChange={(e) => handleSearchProductChange(e)}
      />
      {searchText.length === 0 ? (
        listData.map((categories) => (
          <div
            id={categories._id}
            className="category categoryActive"
            key={categories._id}
          >
            <h4 className="category-title">{categories.description}</h4>
            <ul className="product">
              {categories.ListProduct.map((products) => (
                <ProductItem key={products._id} listProduct={products} />
              ))}
            </ul>
          </div>
        ))
      ) : listFilterProduct.length !== 0 ? (
        <div className="category" style={{ marginTop: 20 }}>
          <ul className="product">
            {listFilterProduct.map((products) => (
              <ProductItem key={products._id} listProduct={products} />
            ))}
          </ul>
        </div>
      ) : (
        <NoneProduct />
      )}
    </div>
  );
}

export default BodyCenter;
