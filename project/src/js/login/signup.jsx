import React from "react";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
        };

        this._onLoginClick = this._onLoginClick.bind(this);
    }

    render() {
        return (
            <div className="login-box">
                <form>
                    <h3>Sign Up</h3>
                    <div className="login-panel">
                        <label>First Name</label>
                        <input />
                    </div>
                    <div className="login-panel">
                        <label>Last Name</label>
                        <input />
                    </div>
                    <div className="login-panel">
                        <label>Username</label>
                        <input />
                    </div>
                    <div className="login-panel">
                        <label>Password</label>
                        <input />
                    </div>
                    <div className="login-panel">
                        <label>Phone #</label>
                        <input />
                    </div>
                    <div className="login-panel content-right">
                        <a href="javascript:void(0)" onClick={this._onLoginClick}>Back to Login</a>
                    </div>
                    <div className="login-panel">
                        <button>Login</button>
                        <button className="btn-cancel">Reset</button>
                    </div>
                </form>
            </div>
        );
    }

    _onLoginClick() {
        this.props.onComponentChange('Login');
    }
}

module.exports = SignUp;
