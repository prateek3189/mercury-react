import React from "react";
import ReactDOM from "react-dom";
import Header from "./common/header.jsx";
import Footer from "./common/footer.jsx";
import ComponentRenderer from "./component/component-renderer.jsx";
import Login from "./login/login.jsx";

function getState() {
    const isLogin = !localStorage.getItem('isLogin') || typeof localStorage.getItem('isLogin') === undefined ? "FALSE" : localStorage.getItem('isLogin');
    const userData = !localStorage.getItem('userData') || typeof localStorage.getItem('userData') === undefined ? [] : localStorage.getItem('userData');
    return {
        isLogin,
        userData
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state =  getState();

        this._doLogin = this._doLogin.bind(this)
        this._doLogOut = this._doLogOut.bind(this)
    }

    render() {
        return (
            <div>
                <Header
                    isLogin={this.state.isLogin}
                    userName={this.state.userData && this.state.userData.first_name || ''}
                    doLogOut={this._doLogOut} />
                {this.state.isLogin === "TRUE" ?
                    <ComponentRenderer componentName="dashboard"/>
                :
                    <Login doLogin={this._doLogin} />
                }

                <Footer />
            </div>
        );
    }

    _doLogin(status, userData) {
        localStorage.setItem('isLogin', status);
        localStorage.setItem('userName', userData.first_name || '');
        this.setState({isLogin: status, userData});
    }

    _doLogOut() {
        localStorage.setItem('isLogin', "FALSE");
        localStorage.setItem('userName', null);
        this.setState({isLogin: "FALSE", userData: null});
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
