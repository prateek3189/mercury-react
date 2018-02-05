import React, { Component } from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from 'react-validation';
import axios from 'axios';
import swal from 'sweetalert2';

const required = (value) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'require';
  }
};

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            formData: {}
        };

        this._onLoginClick = this._onLoginClick.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    render() {
        return (
            <div className="login-box">
                <Form
                    onSubmit={this.onFormSubmit}>
                    <h3>Sign Up</h3>
                    <div className="login-panel">
                        <label>First Name:</label>
                        <div className="required-box">
                            <Input
                                name="first_name"
                                onChange={this.onInputChange.bind(this, 'first_name')}
                                type="text"
                                validations={[required]} />
                            <span className="error-red">*</span>
                        </div>
                    </div>
                    <div className="login-panel" name="last_name">
                        <label>Last Name:</label>
                        <Input
                            name="last_name"
                            onChange={this.onInputChange.bind(this, 'last_name')}
                            type="text" />
                    </div>
                    <div className="login-panel">
                        <label>Phone #:</label>
                        <div className="required-box">
                            <Input
                                name="phone"
                                onChange={this.onInputChange.bind(this, 'phone')}
                                type="text"
                                validations={[required]} />
                            <span className="error-red">*</span>
                        </div>
                    </div>
                    <div className="login-panel">
                        <label>Username:</label>
                        <div className="required-box">
                            <Input
                                name="username"
                                onChange={this.onInputChange.bind(this, 'username')}
                                type="text"
                                validations={[required]} />
                            <span className="error-red">*</span>
                        </div>
                    </div>
                    <div className="login-panel">
                        <label>Password:</label>
                        <div className="required-box">
                            <Input
                                name="password"
                                onChange={this.onInputChange.bind(this, 'password')}
                                type="text"
                                validations={[required]} />
                            <span className="error-red">*</span>
                        </div>
                    </div>
                    <div className="login-panel">
                        <label>Security Question:</label>
                        <div className="required-box">
                            <Input
                                name="security_question"
                                onChange={this.onInputChange.bind(this, 'security_question')}
                                type="text"
                                validations={[required]} />
                            <span className="error-red">*</span>
                        </div>
                    </div>
                    <div className="login-panel">
                        <label>Answer:</label>
                        <div className="required-box">
                            <Input
                                name="answer"
                                onChange={this.onInputChange.bind(this, 'answer')}
                                type="text"
                                validations={[required]} />
                            <span className="error-red">*</span>
                        </div>
                    </div>
                    <div className="login-panel content-right">
                        <a href="javascript:void(0)" onClick={this._onLoginClick}>Back to Login</a>
                    </div>
                    <div className="login-panel">
                        <Button type="submit">Sign Up</Button>
                        <button type="button" className="btn-cancel">Reset</button>
                    </div>
                </Form>
            </div>
        );
    }

    onInputChange(field, event) {
        let formData = this.state.formData;

        formData[field] = event.target.value;
        this.setState({formData});
    }

    onFormSubmit(event) {
        event.preventDefault();

        let formData = this.state.formData;
        formData['action'] = 'signup';

        axios.post(
            'controller/login-controller.php',
            formData
        ).then(function (response) {
            if(response.data === "REQUIRED_ERROR") {
                swal('Oops...', 'Please enter required fields', 'error')
            } else {
                swal('Go Ahead', 'Signup.js: line number 139', 'success');
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    _onLoginClick() {
        this.props.onComponentChange('Login');
    }
}

module.exports = SignUp;
