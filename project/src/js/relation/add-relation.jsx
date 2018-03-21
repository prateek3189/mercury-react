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
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this._onRelationsListClick = this._onRelationsListClick.bind(this);
        this.formReset = this.formReset.bind(this);
    }

    componentWillMount() {
        this._getRelationData();
    }

    render() {
        return (
            <div className="form-box">
                <Form
                    onSubmit={this.onFormSubmit}>
                    <h3>{this.props.componentData && this.props.componentData.relation_id ? 'Edit' : 'Add'} Relation</h3>
                    <div className="form-panel">
                        <label>Relation:</label>
                        <div className="required-box">
                            <Input
                                name="relation"
                                onChange={this.onInputChange.bind(this, 'relation')}
                                value={this.state.formData.relation || ''}
                                type="text"
                                validations={[required]} />
                            <span className="error-red">*</span>
                        </div>
                    </div>
                    <div className="form-panel">
                        <Button type="submit">{this.props.componentData && this.props.componentData.relation_id ? 'Update' : 'Add'}</Button>
                        <button type="button" className="btn-cancel" onClick={this.formReset}>{this.props.componentData && this.props.componentData.relation_id ? 'Clear All' : 'Reset'}</button>
                    </div>
                    <div className="form-panel content-right">
                        <a href="javascript:void(0)" onClick={this._onRelationsListClick}>Back to Relations</a>
                    </div>
                </Form>
            </div>
        );
    }

    _getRelationData() {
        let relationId = this.props.componentData && this.props.componentData.relation_id;
        if(relationId) {
            axios.post(
                'controller/relations-controller.php', {
                    action: 'getRelationData',
                    relationId
                }
            ).then(response => {
                const relationData = response.data;
                if(relationData && relationData.relation_id) {
                    this.setState({formData: relationData});
                } else {
                    swal('Oops...', 'No Record Found', 'error');
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
        url = 'controller/relations-controller.php';

        formData['action'] = (this.props.componentData && this.props.componentData.relation_id) ? 'updateRelation' : 'addRelation';
        formData['owner_id'] = localStorage.getItem('user_id');
        formData['relation_id'] = this.props.componentData && this.props.componentData.relation_id;
        axios.post(
            url,
            formData
        ).then(response => {
            if(response.data === "REQUIRED_ERROR") {
                swal('Oops...', 'Please enter required fields', 'error');
            } else if(response.data === "EXISTS_ERROR") {
                swal('Oops...', 'Relation already exists', 'error');
            } else {
                if(!Number.isNaN(response.data)) {
                    swal('Yeah !', 'Relation added/updated successfully', 'success');
                    this.props.onComponentChange('MyRelationsList');
                }
            }
        }).catch(error => {
            console.log(error);
        });
    }

    formReset() {
        this.setState({formData: {}});
    }

    _onRelationsListClick() {
        this.props.onComponentChange('MyRelationsList');
    }
}

module.exports = SignUp;
