import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";

class LoginSetup extends React.Component {
    constructor() {
        super();
        this.state = {
        };

        this._onSignupClick = this._onSignupClick.bind(this);
    }

    render() {
        return (
            <div className="login-box">
                <form>
                    <h3>Login</h3>
                    <div className="login-panel">
                        <label>Username</label>
                        <input />
                    </div>
                    <div className="login-panel">
                        <label>Password</label>
                        <input />
                    </div>
                    <div className="login-panel content-right">
                        <a href="javascript:void(0)">Forgot Password ?</a>&nbsp;|&nbsp;<a href="javascript:void(0)" onClick={this._onSignupClick}>Sign Up</a>
                    </div>
                    <div className="login-panel">
                        <button>Login</button>
                        <button className="btn-cancel">Reset</button>
                    </div>
                </form>
            </div>
        );
    }

    _onSignupClick() {
        this.props.onComponentChange('SignUp');
    }
}

LoginSetup.propTypes = {
    onComponentChange: PropTypes.func
}

module.exports = LoginSetup;
