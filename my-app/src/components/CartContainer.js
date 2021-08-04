import React from "react";

import Button from "../common/Button";
import SearchInput from "../common/SearchInput";
import Currency from "../common/Currency";
import ItemProductOrder from "../common/ItemProductOrder/index";

class Cart extends React.Component {
    totalPrice = (data) => {
        let totalPrice = 0;
        if (data !== undefined) {
            data.map((item) => (totalPrice += item.totalPrice));
        }
        return totalPrice;
    };

    totalAmount = (data) => {
        let totalAmount = 0;
        if (data !== undefined) {
            data.map((item) => (totalAmount += item.amount));
        }
        return totalAmount;
    };

    render() {
        const { listProductOrder, editOptionProduct } = this.props;

        return (
            <div className="main-container__right">
                <div className="main-cart">
                    <div className="main-cart__top">
                        <Button text="Xem giỏ hàng" />
                    </div>
                    {listProductOrder !== undefined &&
                        listProductOrder.length !== 0 && (
                            <div className="main-cart__listOrder">
                                {listProductOrder.map((item, index) => (
                                    <ItemProductOrder
                                        key={index}
                                        index={index}
                                        infoProduct={item}
                                        editOptionProduct={editOptionProduct}
                                    />
                                ))}
                            </div>
                        )}

                    <div className="main-cart__mid">
                        <div className="total">
                            <p className="color-33">
                                Cộng món(
                                {`${this.totalAmount(listProductOrder)} món`})
                            </p>
                            <Currency
                                className="color-33"
                                price={this.totalPrice(listProductOrder)}
                            />
                        </div>
                        <div className="total">
                            <p className="color-33">Vận chuyển</p>
                            <Currency
                                className="color-33"
                                price={
                                    this.totalPrice(listProductOrder) <= 50000
                                        ? "10000"
                                        : "0"
                                }
                            />
                        </div>
                        <form className="main-cart__mid-form" action="#">
                            <SearchInput
                                type="text"
                                placeholder="Nhập mã ưu đãi tại đây"
                            />
                            <Button className="btn-apply" text="Áp dụng" />
                        </form>
                    </div>
                    <div className="main-cart__bot">
                        <div className="total">
                            <p>Tổng cộng</p>
                            <Currency
                                className="totalPrice"
                                price={
                                    this.totalPrice(listProductOrder) <= 50000
                                        ? this.totalPrice(listProductOrder) +
                                          10000
                                        : this.totalPrice(listProductOrder)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;
