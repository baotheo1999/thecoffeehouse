import React, { useEffect, useState } from "react";
import BodyLeft from "../../../conponents/BodyLeft";
import BodyCenter from "../../../conponents/BodyCenter";
import BodyRight from "../../../conponents/BodyRight";

import { useDispatch, useSelector } from "react-redux";
import { getListData } from "../../../redux/actions/data";
import Loading from "../../../conponents/Loading";

function Body(props) {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.data.listData);
  const stateFlag = useSelector((state) => state.data.statusFlags);

  const [listFilterProduct, setListFilterProduct] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(getListData());
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
    console.log(arr);
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

  //render
  if (stateFlag.isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="container">
        <div className="body">
          <BodyLeft listData={listData} />
          <BodyCenter
            listData={listData}
            searchText={searchText}
            handleSearchProductChange={handleSearchProductChange}
            listFilterProduct={listFilterProduct}
          />
          <BodyRight />
        </div>
      </div>
    );
  }
  //end render
}

export default Body;
