import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";

class MyProfile extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h1>My Profile</h1>
            </div>
        );
    }
}

module.exports = MyProfile;
