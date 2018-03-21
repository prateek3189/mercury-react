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

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.formReset = this.formReset.bind(this);
    }

    componentWillMount() {
        this._getProfileData();
    }

    render() {
        return (
            <div className="form-box">
                <Form
                    onSubmit={this.onFormSubmit}>
                    <h3>My Profile</h3>
                    <div className="form-panel">
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
                    <div className="form-panel" name="last_name">
                        <label>Last Name:</label>
                        <Input
                            name="last_name"
                            onChange={this.onInputChange.bind(this, 'last_name')}
                            value={this.state.formData.last_name || ''}
                            type="text" />
                    </div>
                    <div className="form-panel">
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
                    <div className="form-panel">
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
                    <div className="form-panel">
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
                    <div className="form-panel">
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
                    <div className="form-panel">
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
                    <div className="form-panel">
                        <Button type="submit">Update Profile</Button>
                        <button type="button" className="btn-cancel" onClick={this.formReset}>Clear All</button>
                    </div>
                </Form>
            </div>
        );
    }

    _getProfileData() {
        let userId = localStorage.getItem('user_id');
        if(userId) {
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
    }

    onInputChange(field, event) {
        let { formData } = this.state;

        formData[field] = event.target.value;
        this.setState({formData});
    }

    onFormSubmit(event) {
        event.preventDefault();

        let { formData } = this.state,
        url = 'controller/friends-controller.php';

        formData['action'] = 'updateFriend';
        formData['user_id'] = localStorage.getItem('user_id');

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
                    swal('Yeah !', 'User Profile added/updated successfully', 'success');
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

module.exports = MyProfile;
