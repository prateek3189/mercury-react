import React from "react";
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
            <ComponentRenderer componentName={this.state.componentName} onComponentChange={this._onComponentChange}/>
        );
    }

    _onComponentChange(componentName) {
        this.setState({componentName});
    }
}

module.exports = Login;
