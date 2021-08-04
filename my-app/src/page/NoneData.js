import React from "react";
import "../assets/style.scss";

import PlacehoderLoading from "../common/PlacehoderLoading/index";

class NoneData extends React.Component {
    render() {
        return (
            <div className="nonedata">
                <PlacehoderLoading />
            </div>
        );
    }
}

export default NoneData;
