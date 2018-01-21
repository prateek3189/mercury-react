import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <h2>Introduce Tabstrip Here</h2>
            </div>
        );
    }
}

module.exports = Dashboard;
