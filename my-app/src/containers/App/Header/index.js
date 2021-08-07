import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderRender from "../../../conponents/layout/Header";
import {
  getListAddress,
  resetListAddress,
} from "../../../redux/actions/address";
import { debounce } from "lodash";
function Header() {
  const dispatch = useDispatch();
  const refAddress = useRef();
  const refShipNow = useRef();
  const listOrderProduct = useSelector((state) => state.order.listProductOrder);
  const listAddress = useSelector((state) => state.address.listAddress);
  const [searchText, setSearchText] = useState("");
  const [close, setClose] = useState(false);
  //shipnow
  const [openShipNow, setOpenShipNow] = useState(false);
  const [openTimeOrder, setOpenTimeOrder] = useState(false);
  const [date, setDate] = useState([]);
  const [checkDay, setCheckDay] = useState(false);
  const [textButton, setTextButton] = useState("");

  //address

  const fetchAddress = (keyword) => {
    dispatch(getListAddress(keyword));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchAddress = useCallback(
    debounce((nextValue) => fetchAddress(nextValue), 400),
    []
  );
  const handleSearchAddressChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length > 3) {
      debounceSearchAddress(e.target.value);
    } else {
      dispatch(resetListAddress());
    }
  };

  const getAddressClick = (address) => {
    setSearchText(address);
    setClose(true);
  };

  const openAddressModalClick = () => {
    setClose(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeAddressModal);
    return () => document.removeEventListener("mousedown", closeAddressModal);
  }, []);

  const closeAddressModal = (event) => {
    if (!refAddress.current?.contains(event.target)) {
      setClose(true);
    }
    if (!refShipNow.current?.contains(event.target)) {
      setOpenShipNow(false);
    }
  };
  //end address

  //ship now
  const openShipNowClick = () => {
    setOpenShipNow(!openShipNow);
  };
  const openTimeOrderClick = () => {
    setOpenTimeOrder(true);
  };
  const closeShipNowClick = () => {
    const day = document.getElementById("date").value;
    const hours = document.getElementById("time").value;

    if (hours !== "Trong 15-30 phút") {
      const date = {
        day: day,
        hours: hours,
      };
      setTextButton(date);
      setOpenShipNow(false);
    } else {
      setTextButton("");
      setOpenTimeOrder(false);
    }
  };
  useEffect(() => {
    let day = new Date();
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    let nextTwoDay = new Date(day);
    nextTwoDay.setDate(day.getDate() + 2);
    //giờ ngày khác
    let tomorrow = [];
    for (let i = 7; i <= 20; i++) {
      for (let j = 0; j <= 30; j += 30) {
        if (j === 0) {
          tomorrow.push(i + ":00");
        } else {
          tomorrow.push(i + ":" + j);
        }
      }
    }

    let minutes = day.getMinutes();
    //giờ hôm nay
    let now = ["Trong 15-30 phút"];
    let sum = day.getHours();
    if (sum <= 20 && sum >= 7) {
      let first = 0;
      if (minutes >= 45) {
        first = 1;
      }
      for (let i = first; i <= 20 - sum; i++) {
        if (i < 3) {
          for (let j = 0; j <= 45; j += 15) {
            if (j === 0) {
              now.push(sum + i + ":00");
            } else {
              now.push(sum + i + ":" + j);
            }
          }
        } else {
          for (let j = 0; j <= 30; j += 30) {
            if (j === 0) {
              now.push(sum + i + ":00");
            } else {
              now.push(sum + i + ":" + j);
            }
          }
        }
      }

      if (minutes < 15) {
        now.splice(1, 3);
      } else if (minutes < 30) {
        now.splice(1, 4);
      } else if (minutes < 45) {
        now.splice(1, 5);
      } else if (minutes > 45) {
        now.splice(1, 2);
      }
    }
    const days = [
      day.toLocaleDateString("en-GB"),
      nextDay.toLocaleDateString("en-GB"),
      nextTwoDay.toLocaleDateString("en-GB"),
    ];

    const dates = {
      days: days,
      hoursNow: now,
      hoursTomorrow: tomorrow,
    };

    setDate(dates);
  }, []);

  const hanldeDayChange = (e) => {
    if (e.target.value !== date.days[0]) {
      setCheckDay(true);
    } else {
      setCheckDay(false);
    }
  };

  const handeleShipNow = () => {
    setTextButton("");
    setOpenShipNow(false);
    setOpenTimeOrder(false);
    setCheckDay(false);
  };
  //end ship now

  return (
    <HeaderRender
      //address
      searchText={searchText}
      listAddress={listAddress}
      close={close}
      handleSearchAddressChange={handleSearchAddressChange}
      getAddressClick={getAddressClick}
      openAddressModalClick={openAddressModalClick}
      refAddress={refAddress}
      //shipnow
      openShipNow={openShipNow}
      openShipNowClick={openShipNowClick}
      openTimeOrderClick={openTimeOrderClick}
      openTimeOrder={openTimeOrder}
      closeShipNowClick={closeShipNowClick}
      date={date}
      hanldeDayChange={hanldeDayChange}
      checkDay={checkDay}
      textButton={textButton}
      handeleShipNow={handeleShipNow}
      refShipNow={refShipNow}
      //cart
      listOrderProduct={listOrderProduct}
    />
  );
}

export default Header;
