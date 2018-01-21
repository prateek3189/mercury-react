import React from "react";

class Header extends React.Component {
    constructor() {
        super();
        this.state =  {
        };

        this._doLogOut = this._doLogOut.bind(this)
    }

    render() {
        const user_name = this.props.userName,
            isLogin = this.props.isLogin;
        return (
            <header className="logo-box">
                <img src="images/logo.png"/>
                <span>Mercury - React</span>
                {isLogin === 'TRUE' ?
                    <div className="welcome-message">
                        Welcome {user_name} | <a href="javascript:void(0)" onClick={this._doLogOut}>Logout</a>
                    </div>
                : null}
            </header>
        );
    }

    _doLogOut() {
        this.props.doLogOut();
        this.forceUpdate();
    }
}

module.exports = Header;
