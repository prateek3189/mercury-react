import React from "react";

class Header extends React.Component {
    render() {
        return (
            <header className="logo-box">
                <img src="images/logo.png"/>
                <span>Mercury - React</span>
            </header>
        );
    }
}

module.exports = Header;
