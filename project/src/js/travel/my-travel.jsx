import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";

class MyTravel extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h1>My Travel</h1>
            </div>
        );
    }
}

module.exports = MyTravel;
