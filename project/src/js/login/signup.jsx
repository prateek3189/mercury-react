import React, { Component } from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from 'react-validation';
import axios from 'axios';
import swal from 'sweetalert2';

const required = (value) => {
  if (value && !value.toString().trim().length) {
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
        this.formReset = this.formReset.bind(this);
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
                                value={this.state.formData.first_name || ''}
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
                            value={this.state.formData.last_name || ''}
                            type="text" />
                    </div>
                    <div className="login-panel">
                        <label>Phone #:</label>
                        <div className="required-box">
                            <Input
                                name="phone"
                                onChange={this.onInputChange.bind(this, 'phone')}
                                type="text"
                                value={this.state.formData.phone || ''}
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
                                value={this.state.formData.username || ''}
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
                                type="password"
                                value={this.state.formData.password || ''}
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
                                value={this.state.formData.security_question || ''}
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
                                type="password"
                                value={this.state.formData.answer || ''}
                                validations={[required]} />
                            <span className="error-red">*</span>
                        </div>
                    </div>
                    <div className="login-panel content-right">
                        <a href="javascript:void(0)" onClick={this._onLoginClick}>Back to Login</a>
                    </div>
                    <div className="login-panel">
                        <Button type="submit">Sign Up</Button>
                        <button type="button" className="btn-cancel" onClick={this.formReset}>Reset</button>
                    </div>
                </Form>
            </div>
        );
    }

    onInputChange(field, event) {
        let { formData } = this.state;

        formData[field] = event.target.value;
        this.setState({formData});
    }

    onFormSubmit(event) {
        event.preventDefault();

        let { formData } = this.state;
        formData['action'] = 'signup';

        axios.post(
            'controller/login-controller.php',
            formData
        ).then(response => {
            if(response.data === "REQUIRED_ERROR") {
                swal('Oops...', 'Please enter required fields', 'error');
            } else if(response.data === "EXISTS_ERROR") {
                swal('Oops...', 'Username or Phone already exists', 'error');
            } else {
                if(!Number.isNaN(response.data) && response.data !== null && response.data != '') {
                    swal('Yeah !', 'User added successfully', 'success');
                    this.props.onComponentChange('Login');
                }
            }
        }).catch(error => {
            console.log(error);
        });
    }

    formReset() {
        this.setState({formData: {}});
    }

    _onLoginClick() {
        this.props.onComponentChange('Login');
    }
}

module.exports = SignUp;
