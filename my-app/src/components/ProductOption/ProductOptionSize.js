import React from "react";

import Input from "../../common/SearchInput";
import Currency from "../../common/Currency";

class ProductOptionSize extends React.Component {
    render() {
        const { itemProductOrder, productSize, handleProductSize, name } =
            this.props;
        return (
            <div className="checkbox-container">
                <p>{name}</p>
                <div className="checkbox-items">
                    {itemProductOrder.variants.map((item) => (
                        <div className="checkbox" key={item.code}>
                            <Input
                                checked={
                                    item.val === productSize ? "checked" : null
                                }
                                id={item.code}
                                type="radio"
                                name="radio"
                                onClick={() => {
                                    handleProductSize(item);
                                }}
                            />
                            <label htmlFor={item.code}>
                                {item.val} (
                                <Currency
                                    price={
                                        item.price -
                                        itemProductOrder.variants[0].price
                                    }
                                />
                                )
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ProductOptionSize;
