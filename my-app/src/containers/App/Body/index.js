import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BodyCenter from "../../../conponents/BodyCenter";
import BodyLeft from "../../../conponents/BodyLeft";
import BodyRight from "../../../conponents/BodyRight";
import Loading from "../../../conponents/Loading";
import ModalOrder from "./OrderProduct";
import { getListData } from "../../../redux/actions/data";
import {
  selectProduct,
  CloseModalOrder,
  setListProductOrder,
} from "../../../redux/actions/order";

function Body(props) {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.data.listData);
  const stateFlag = useSelector((state) => state.data.statusFlags);
  const infoProductSelect = useSelector(
    (state) => state.order.infoProductSelect
  );
  const openModalOrder = useSelector(
    (state) => state.order.statusFlags.openModal
  );
  const listProductOrder = useSelector((state) => state.order.listProductOrder);

  const [listFilterProduct, setListFilterProduct] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getListData());
    if (JSON.parse(localStorage.getItem("listOrderProduct"))) {
      dispatch(
        setListProductOrder(
          JSON.parse(localStorage.getItem("listOrderProduct"))
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //scroll menu active
  const getIdActive = (id) => {
    let check = document.querySelectorAll(".active");

    if (check.length > 0) {
      document.querySelector(".active").classList.remove("active");
    }
    document.getElementById(`at${id}`).classList.add("active");
  };

  const handleOnScrollMenu = () => {
    let arr = document.querySelectorAll(".categoryActive");
    let check = window.scrollY + 80;

    arr.forEach((item) =>
      document.getElementById(item.id).offsetTop <= check &&
      check <
        document.getElementById(item.id).offsetTop +
          document.getElementById(item.id).offsetHeight
        ? getIdActive(item.id)
        : null
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnScrollMenu);
    return () => window.removeEventListener("scroll", handleOnScrollMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //end scroll menu active

  const handleSearchProductChange = (e) => {
    let filterProduct = [];
    listData.map((item) =>
      item.ListProduct.filter(
        (i) =>
          i.product_name.toLowerCase().includes(e.target.value.toLowerCase()) &&
          filterProduct.push(i)
      )
    );

    //xoá phần từ trùng lặp
    let newFilterProduct = filterProduct.filter((elem, index, self) => {
      return index === self.indexOf(elem);
    });
    setSearchText(e.target.value);
    setListFilterProduct(newFilterProduct);
  };

  //order product
  const openModalOrderClick = (product, index) => {
    dispatch(selectProduct(product, index));
  };
  const closeModalOrderClick = () => {
    dispatch(CloseModalOrder());
  };

  //end order product

  //render
  if (stateFlag.isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="container">
          <div className="body">
            <BodyLeft listData={listData} />
            <BodyCenter
              listData={listData}
              searchText={searchText}
              handleSearchProductChange={handleSearchProductChange}
              listFilterProduct={listFilterProduct}
              openModalOrderClick={openModalOrderClick}
            />
            <BodyRight
              listProductOrder={listProductOrder}
              openModalOrderClick={openModalOrderClick}
            />
          </div>
        </div>
        {openModalOrder && (
          <ModalOrder
            closeModalOrderClick={closeModalOrderClick}
            infoProductSelect={infoProductSelect}
          />
        )}
      </>
    );
  }
  //end render
}

export default Body;
