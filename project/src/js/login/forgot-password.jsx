import React, { Component } from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from 'react-validation';
import axios from 'axios';
import swal from 'sweetalert2';

class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            usernameExists: false,
            username: '',
            userData: []
        };

        this._onLoginClick = this._onLoginClick.bind(this);
        this._resetForm = this._resetForm.bind(this);
        this._checkUsernameExistsGeneratePassword = this._checkUsernameExistsGeneratePassword.bind(this);
    }

    render() {
        const buttonText = this.state.usernameExists ? 'Generate Password' : 'Check Username';
        return (
            <div className="login-box">
                <Form
                    onSubmit={this._onFormSubmit}>
                    <h3>Forgot Password</h3>
                    <div className="login-panel">
                        <label>Username</label>
                        <input
                            name="username"
                            value={this.state.username || ''}
                            onChange={this._onInputChange.bind(this, 'username')}/>
                    </div>

                    {this.state.usernameExists ?
                        <div>
                            <div className="login-panel">
                                <label>Security Question: </label>
                                <b>{this.state.userData && this.state.userData.security_question}</b>
                            </div>
                            <div className="login-panel">
                                <label>Answer</label>
                                <input
                                    name="answer"
                                    type="password"
                                    value={this.state.answer || ''}
                                    onChange={this._onInputChange.bind(this, 'answer')}/>
                            </div>
                        </div>
                    : null}
                    <div className="login-panel content-right">
                        <a href="javascript:void(0)" onClick={this._onLoginClick}>Back to Login</a>
                    </div>
                    <div className="login-panel">
                        <button onClick={this._checkUsernameExistsGeneratePassword}>{buttonText}</button>
                        <button className="btn-cancel" onClick={this._resetForm}>Reset</button>
                    </div>
                </Form>
            </div>
        );
    }

    _onFormSubmit(event) {
        event.preventDefault();
    }

    _resetForm() {
        this.setState({
            usernameExists: false,
            username: '',
            userData: []
        });
    }

    _onLoginClick() {
        this.props.onComponentChange('Login');
    }

    _checkUsernameExistsGeneratePassword() {
        if(this.state.usernameExists) {
            if(this.state.userData.answer === this.state.answer) {
                const newPassword = Math.random().toString(36).slice(-8);
                axios.post(
                    'controller/login-controller.php', {
                        action: 'resetpassword',
                        password: newPassword,
                        user_id: this.state.userData.user_id
                    }
                ).then(response => {
                    if(response.data) {
                        swal('Yeahhh!', 'Your new password is >>>'+newPassword+'<<<', 'success');
                        this.props.onComponentChange('Login');
                    } else {
                        swal('Oops...', 'Something went wrong', 'error');
                    }

                }).catch(error => {
                    console.log(error);
                });
            } else {
                swal('Oops...', 'The answer you entered is incorrect', 'error');
            }
        } else {
            const username = this.state.username;

            axios.post(
                'controller/login-controller.php', {
                    action: 'checkUsernameExists',
                    username
                }
            ).then(response => {
                const userData = response.data;
                if(userData && userData.user_id) {
                    this.setState({usernameExists: true, userData});
                } else {
                    swal('Oops...', 'Username does not exists', 'error');
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    _onInputChange(field, event) {
        let entry = this.state;
        entry[field] = event.target.value;

        this.setState(entry);
    }
}

module.exports = ForgotPassword;
