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
    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        };

        this._onFriendsListClick = this._onFriendsListClick.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.formReset = this.formReset.bind(this);
    }

    componentWillMount() {
        this._getFriendData();
    }

    render() {
        return (
            <div className="add-friend-box">
                <Form
                    onSubmit={this.onFormSubmit}>
                    <h3>{this.props.componentData && this.props.componentData.user_id ? 'Edit' : 'Add'} Friend</h3>
                    <div className="friends-form-panel">
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
                    <div className="friends-form-panel" name="last_name">
                        <label>Last Name:</label>
                        <Input
                            name="last_name"
                            onChange={this.onInputChange.bind(this, 'last_name')}
                            value={this.state.formData.last_name || ''}
                            type="text" />
                    </div>
                    <div className="friends-form-panel">
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
                    <div className="friends-form-panel">
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
                    <div className="friends-form-panel">
                        <label>Password:</label>
                        <div className="required-box">
                            <Input
                                name="password"
                                onChange={this.onInputChange.bind(this, 'password')}
                                type="password"
                                validations={[required]} />
                            <span className="error-red">*</span>
                        </div>
                    </div>
                    <div className="friends-form-panel">
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
                    <div className="friends-form-panel">
                        <label>Answer:</label>
                        <div className="required-box">
                            <Input
                                name="answer"
                                onChange={this.onInputChange.bind(this, 'answer')}
                                type="password"
                                validations={[required]} />
                            <span className="error-red">*</span>
                        </div>
                    </div>
                    <div className="friends-form-panel">
                        <Button type="submit">{this.props.componentData && this.props.componentData.user_id ? 'Update' : 'Add'}</Button>
                        <button type="button" className="btn-cancel" onClick={this.formReset}>{this.props.componentData && this.props.componentData.user_id ? 'Clear All' : 'Reset'}</button>
                    </div>
                    <div className="friends-form-panel content-right">
                        <a href="javascript:void(0)" onClick={this._onFriendsListClick}>Back to Friends</a>
                    </div>
                </Form>
            </div>
        );
    }

    _getFriendData() {
        let userId = this.props.componentData && this.props.componentData.user_id
        axios.post(
            'controller/login-controller.php', {
                action: 'getFriendData',
                userId
            }
        ).then(response => {
            const userData = response.data;
            if(userData && userData.user_id) {
                this.setState({formData: userData});
            } else {
                swal('Oops...', 'You friend migh be inactive of deleted', 'error');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    onInputChange(field, event) {
        let { formData } = this.state;

        formData[field] = event.target.value;
        this.setState({formData});
    }

    onFormSubmit(event) {
        event.preventDefault();

        let { formData } = this.state,
        url = (this.props.componentData && this.props.componentData.user_id) ? 'controller/friends-controller.php' : 'controller/login-controller.php';

        formData['action'] = (this.props.componentData && this.props.componentData.user_id) ? 'updateFriend' : 'signup';
        formData['owner_id'] = localStorage.getItem('user_id');
        formData['user_id'] = this.props.componentData && this.props.componentData.user_id;

        axios.post(
            url,
            formData
        ).then(response => {
            if(response.data === "REQUIRED_ERROR") {
                swal('Oops...', 'Please enter required fields', 'error');
            } else if(response.data === "EXISTS_ERROR") {
                swal('Oops...', 'Username or Phone already exists', 'error');
            } else {
                if(!Number.isNaN(response.data)) {
                    swal('Wow !', 'User added successfully', 'success');
                    this.props.onComponentChange('MyFriendsList');
                }
            }
        }).catch(error => {
            console.log(error);
        });
    }

    formReset() {
        this.setState({formData: {}});
    }

    _onFriendsListClick() {
        this.props.onComponentChange('MyFriendsList');
    }
}

module.exports = SignUp;
