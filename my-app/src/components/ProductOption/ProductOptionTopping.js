import React from "react";

import Input from "../../common/SearchInput";
import Currency from "../../common/Currency";

class ProductOptionTopping extends React.Component {
    render() {
        const { itemProductOrder, nameTopping, handleProductToping, name } =
            this.props;
        return (
            <div className="checkbox-container">
                <p>{name}</p>
                <div className="checkbox-items">
                    {itemProductOrder.topping_list.map((item, index) => (
                        <div className="checkbox" key={item.code}>
                            <Input
                                type="checkbox"
                                name="checkbox"
                                id={item.code}
                                onClick={(e) => {
                                    handleProductToping(e, item, index);
                                }}
                                checked={
                                    nameTopping.includes(item.product_name)
                                        ? "checked"
                                        : null
                                }
                            />
                            <label htmlFor={item.code}>
                                {item.product_name} (
                                <Currency price={item.price} />)
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ProductOptionTopping;
