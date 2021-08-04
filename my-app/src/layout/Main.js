import React from "react";
import PlacehoderLoading from "../common/PlacehoderLoading/index";
import CartContainer from "../components/CartContainer";
import CategoryContainer from "../components/CategoryContainer/index";
import ProductContainer from "../components/ProductContainer/index";
import NoneData from "../page/NoneData";

import ProductOption from "../components/ProductOption/index";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newData: [],
      loading: true,
      active: null, //new
      itemProductOrder: [],
      optionBoxClose: false,
      listProductOrder: [],
      indexProductOrder: -1,
    };
  }

  mergeData = (categories, products) => {
    categories.map((category) => {
      let arr = [];
      products.data.map((product) => {
        if (product.categ_id.includes(category.id)) {
          arr.push(product);
        }
        return arr;
      });
      category.ListProduct = arr; // Tạo ra key ListProduct trong category để hứng giá trị của listProduct
      return category;
    });
    return categories;
  };

  componentDidMount() {
    fetch("https://api.thecoffeehouse.com/api/v2/category/web")
      .then((response) => response.json())
      .then((categories) => {
        fetch("https://api.thecoffeehouse.com/api/v2/menu")
          .then((response) => response.json())
          .then((products) => {
            this.mergeData(categories, products);
            let copyData = [];
            categories.map(
              (item) => item.ListProduct.length > 0 && copyData.push(item)
            );

            this.setState({
              newData: copyData,
              loading: false,
              active: categories[0]._id,
            });
          });
      });

    if (
      JSON.parse(localStorage.getItem("listOrder")) &&
      JSON.parse(localStorage.getItem("listOrder")).length > 0
    ) {
      this.setState({
        listProductOrder: JSON.parse(localStorage.getItem("listOrder")),
      });
    }
  }

  getIdActive = (id) => {
    let check = document.querySelectorAll(".active");

    if (check.length > 0) {
      document.querySelector(".active").classList.remove("active");
    }
    document.getElementById(`at${id}`).classList.add("active");
  };

  handleClickCloseOptionBox = () => {
    this.setState({
      optionBoxClose: false,
      itemProductOrder: [],
    });

    document.body.classList.remove("lockScroll");
  };

  getDataOpitonProduct = (data) => {
    let { listProductOrder } = this.state;

    let copyListProductOrder = [...listProductOrder];
    //edit item product order
    if (this.state.indexProductOrder !== -1) {
      copyListProductOrder = copyListProductOrder.filter(
        (item, index) => index !== this.state.indexProductOrder
      );

      this.setState({
        listProductOrder: copyListProductOrder,
      });
    }

    let flag = 1;
    copyListProductOrder.map((item) =>
      item.product_name === data.product_name &&
      item.productSize === data.productSize &&
      JSON.stringify(item.codeTopping) === JSON.stringify(data.codeTopping) &&
      item.note === data.note
        ? ((item.amount += data.amount),
          (item.totalPrice += data.totalPrice),
          (flag *= -1))
        : (flag *= 1)
    );

    if (flag === 1) {
      const listOrder = [...copyListProductOrder, data].filter(
        (item) => item.amount > 0
      );
      this.setState({
        listProductOrder: listOrder,
      });
      this.props.getAmount([...copyListProductOrder, data]);

      //set data for localStorage
      localStorage.setItem("listOrder", JSON.stringify(listOrder));
    } else {
      //set data for localStorage
      localStorage.setItem("listOrder", JSON.stringify(copyListProductOrder));
    }

    this.setState({
      optionBoxClose: false,
      indexProductOrder: -1,
      itemProductOrder: [],
    });

    document.body.classList.remove("lockScroll");
  };

  handleClickOpenOptionBox = (data) => {
    console.log("data", data);
    let products = {
      product_name: data.product_name,
      image: data.image,
      topping_list: data.topping_list,
      variants: data.variants,
    };

    this.setState({
      optionBoxClose: true,
      itemProductOrder: products,
      indexProductOrder: -1,
    });
    document.body.classList.add("lockScroll");
  };

  editOptionProduct = (data, index) => {
    this.setState({
      optionBoxClose: true,
      itemProductOrder: data,
      indexProductOrder: index,
    });
    document.body.classList.add("lockScroll");
  };

  render() {
    const {
      active,
      newData,
      loading,
      itemProductOrder,
      listProductOrder,
      optionBoxClose,
    } = this.state;

    if (loading) {
      return <PlacehoderLoading />;
    } else if (newData.length === 0) {
      return <NoneData />;
    } else {
      return (
        <main className="main">
          <div className="main-container container">
            <div className="main-container__left">
              <CategoryContainer active={active} data={newData} />
              <ProductContainer
                getIdActive={this.getIdActive}
                data={newData}
                handleClickOpenOptionBox={this.handleClickOpenOptionBox}
              />
            </div>
            <CartContainer
              listProductOrder={listProductOrder}
              editOptionProduct={this.editOptionProduct}
            />
          </div>
          {itemProductOrder.length !== 0 ? (
            <ProductOption
              itemProductOrder={itemProductOrder}
              optionBoxClose={optionBoxClose}
              onClick={this.handleClickCloseOptionBox}
              getDataOpitonProduct={this.getDataOpitonProduct}
            />
          ) : null}
        </main>
      );
    }
  }
}

export default Main;
