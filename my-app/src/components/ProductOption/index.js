import React from "react";
import "./productoption.scss";
import Image from "../../common/Image";
import Input from "../../common/SearchInput";
import Currency from "../../common/Currency";
import ProductOptionSize from "./ProductOptionSize";
import ProductOptionTopping from "./ProductOptionTopping";

class ProductOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productSize: this.props.itemProductOrder.variants[0].val,
            productPrice: this.props.itemProductOrder.variants[0].price,
            amount: 1,
            topping: 0,
            nameTopping: "",
            totalPrice: 0,
            codeTopping: [],
        };
    }

    handleProductSize = (item) => {
        this.setState({
            productSize: item.val,
            productPrice: item.price,
        });
    };

    handlePlusAmount = () => {
        this.setState({
            amount: this.state.amount + 1,
        });
    };

    handleMinusAmount = () => {
        if (this.state.amount > 0) {
            this.setState({
                amount: this.state.amount - 1,
            });
        }
    };

    handleProductToping = (e, item, index) => {
        let check = e.target.checked;
        if (check === true) {
            let addCodeTopping = this.state.codeTopping.splice(
                index,
                0,
                item.code
            );

            this.setState({
                topping: this.state.topping + item.price,
                nameTopping: this.state.nameTopping.concat(
                    ` ${item.product_name} +`
                ),
                codeTopping: [...this.state.codeTopping, addCodeTopping],
            });
        } else {
            this.setState({
                topping: this.state.topping - item.price,
                nameTopping: this.state.nameTopping.replace(
                    ` ${item.product_name} +`,
                    ""
                ),
                codeTopping: this.state.codeTopping.filter(
                    (i) => i !== item.code
                ),
            });
        }

        
    };

    getInfoProduct = () => {
        const { itemProductOrder } = this.props;
        let product = {
            product_name: itemProductOrder.product_name,
            image: itemProductOrder.image,
            topping_list: itemProductOrder.topping_list,
            variants: itemProductOrder.variants,

            toppingPrice: this.state.topping,
            productPrice: this.state.productPrice,
            productSize: this.state.productSize,
            nameTopping: this.state.nameTopping,
            amount: this.state.amount,
            note: document.getElementById("note").value,
            codeTopping: this.state.codeTopping.filter(item => typeof item !== "object"),
            totalPrice:
                this.state.amount *
                (this.state.productPrice + this.state.topping),
        };

        this.props.getDataOpitonProduct(product);
    };

    componentDidMount() {
        const { itemProductOrder } = this.props;
        if (
            itemProductOrder.productSize !== undefined &&
            itemProductOrder.amount !== undefined &&
            itemProductOrder.toppingPrice !== undefined &&
            itemProductOrder.productPrice !== undefined &&
            itemProductOrder.nameTopping !== undefined &&
            itemProductOrder.codeTopping !== undefined
        ) {
            this.setState({
                productSize: itemProductOrder.productSize,
                amount: itemProductOrder.amount,
                topping: itemProductOrder.toppingPrice,
                productPrice: itemProductOrder.productPrice,
                nameTopping: itemProductOrder.nameTopping,
                codeTopping: itemProductOrder.codeTopping,
            });
        }
    }

    render() {
        const { itemProductOrder, optionBoxClose } = this.props;
        const { productSize, productPrice, amount, topping, nameTopping } =
            this.state;

            

        return (
            <div className="overlay">
                <div className="overlay" onClick={this.props.onClick}></div>
                <div
                    className={
                        optionBoxClose
                            ? "product-option-open  product-option"
                            : "product-option-close product-option"
                    }
                >
                    <div className="product-option__top">
                        <Image
                            src={itemProductOrder.image}
                            alt={`ảnh ${itemProductOrder.product_name}`}
                        />
                        <div className="product-option__top-info">
                            <p>{itemProductOrder.product_name}</p>
                            <p>{productSize}</p>
                            <p>{nameTopping.slice(0, -2)}</p>
                        </div>
                        <i
                            className="fa fa-times"
                            onClick={this.props.onClick}
                        ></i>
                    </div>

                    <div className="product-option__body">
                        <div className="product-option__body-option">
                            <p>Loại</p>
                            <ProductOptionSize
                                name="Size-"
                                itemProductOrder={itemProductOrder}
                                productSize={productSize}
                                handleProductSize={this.handleProductSize}
                            />

                            {itemProductOrder.topping_list.length !== 0 ? (
                                <ProductOptionTopping
                                    name="Topping-"
                                    itemProductOrder={itemProductOrder}
                                    nameTopping={nameTopping}
                                    handleProductToping={
                                        this.handleProductToping
                                    }
                                />
                            ) : null}
                        </div>
                        <form
                            className="main-container__left-product__form product-option__body-note"
                            action="#"
                        >
                            <i className="fa fa-pencil"></i>
                            <Input
                                id="note"
                                type="text"
                                placeholder="Thêm ghi chú món này"
                            />
                        </form>
                    </div>

                    <div className="product-option__bot">
                        <div className="product-option__bot-left">
                            <i
                                className="fa fa-minus-circle"
                                onClick={this.handleMinusAmount}
                            ></i>
                            <span>{amount}</span>
                            <i
                                className="fa fa-plus-circle"
                                onClick={this.handlePlusAmount}
                            ></i>
                        </div>
                        <div
                            className="product-option__bot-right"
                            onClick={this.getInfoProduct}
                        >
                            <Currency
                                className="btn addtocart"
                                price={amount * (productPrice + topping)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductOption;
