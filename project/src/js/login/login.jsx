import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            componentName: 'Login'
        };

        this._onComponentChange = this._onComponentChange.bind(this);
    }

    render() {
        return (
            <ComponentRenderer componentName={this.state.componentName} onComponentChange={this._onComponentChange} {...this.props} />
        );
    }

    _onComponentChange(componentName) {
        this.setState({componentName});
    }
}

Login.propTypes = {
    onComponentChange: PropTypes.func
}

module.exports = Login;
