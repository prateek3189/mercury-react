import React from "react";
import ReactDOM from "react-dom";
import Header from "./common/header.jsx";
import Footer from "./common/footer.jsx";
import ComponentRenderer from "./component/component-renderer.jsx";
import Login from "./login/login.jsx";

function getState() {
    const isLogin = !localStorage.getItem('isLogin') || typeof localStorage.getItem('isLogin') === undefined ? "FALSE" : localStorage.getItem('isLogin');
    return {
        isLogin
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state =  getState();
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.isLogin === "TRUE" ?
                    <ComponentRenderer componentName="dashboard"/>
                :
                    <Login />
                }

                <Footer />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
