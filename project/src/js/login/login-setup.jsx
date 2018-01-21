import React, { Component } from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from 'react-validation';
import axios from 'axios';
import swal from 'sweetalert2';
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";

const required = (value) => {
  if (value && !value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'require';
  }
};

class LoginSetup extends React.Component {
    constructor() {
        super();
        this.state = {
        };

        this._onSignupClick = this._onSignupClick.bind(this);
        this._onFormSubmit = this._onFormSubmit.bind(this);
        this._onForgotPasswprdClick = this._onForgotPasswprdClick.bind(this);
    }

    render() {
        return (
            <div className="login-box">
                <Form
                    onSubmit={this._onFormSubmit}>
                    <h3>Login</h3>
                    <div className="login-panel">
                        <label>Username</label>
                        <Input
                            name="username"
                            value={this.state.username || ''}
                            validations={[required]}
                            onChange={this._onInputChange.bind(this, 'username')} />
                    </div>
                    <div className="login-panel">
                        <label>Password</label>
                        <Input
                            type="password"
                            name="username"
                            value={this.state.password || ''}
                            validations={[required]}
                            onChange={this._onInputChange.bind(this, 'password')} />
                    </div>
                    <div className="login-panel content-right">
                        <a href="javascript:void(0)" onClick={this._onForgotPasswprdClick}>Forgot Password ?</a>&nbsp;|&nbsp;<a href="javascript:void(0)" onClick={this._onSignupClick}>Sign Up</a>
                    </div>
                    <div className="login-panel">
                        <Button  type="submit">Login</Button>
                        <Button className="btn-cancel">Reset</Button>
                    </div>
                </Form>
            </div>
        );
    }

    _onFormSubmit(event) {
        event.preventDefault();

        const {username, password } = this.state;
        if(
            !username || username === '' ||
            !password || password === ''
        ) {
            swal('Oops...', 'Please enter required fields', 'error');
        } else {
            axios.post(
                'controller/login-controller.php', {
                    action: 'doLogin',
                    username,
                    password
                }
            ).then(response => {
                const userData = response.data;
                if(userData && userData.user_id) {
                    if(userData.is_active === 0) {
                        swal('Oops...', 'Your account is not active. Kindly contact Administrator', 'error');
                    } else {
                        this.props.doLogin('TRUE', userData)
                    }
                } else {
                    swal('Oops...', 'You have entered wrong Username and Password', 'error');
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    _onSignupClick() {
        this.props.onComponentChange('SignUp');
    }

    _onInputChange(field, event) {
        let entry = {};
        entry[field] = event.target.value;

        this.setState(entry);
    }

    _onForgotPasswprdClick() {
        this.props.onComponentChange('ForgotPassword');
    }
}

LoginSetup.propTypes = {
    onComponentChange: PropTypes.func,
    doLogin: PropTypes.func
}

module.exports = LoginSetup;
