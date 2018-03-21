import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";
import svg from "../lib/icons";
import Icon from "svg-inline-react";
import DataTable from "../lib/data-table.jsx";
import axios from 'axios';
import swal from 'sweetalert2';
import _ from 'lodash';

function getFilteredData(rowData, filter) {
    let newData = [];
    filter = filter && filter.toLowerCase();

    _.each(rowData, (row) => {
        const first_name = row.first_name && row.first_name.toLowerCase(),
        last_name = row.last_name && row.last_name.toLowerCase(),
        phone = row.phone && row.phone.toLowerCase();

        if(
            first_name.indexOf(filter) > -1 ||
            last_name.indexOf(filter) > -1  ||
            phone.indexOf(filter) > -1
        ) {
            newData.push(row);
        }
    });
    return newData;
}

class MyFriendsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentName: null,
            friends: [],
            columns: this._getColumns(),
            componentData: props.componentData
        };
    }

    componentWillMount() {
        this._getAllFriends();
    }

    _getColumns() {
        return [
            {name: 'Name', key:'name', template:this._getNameTemplate.bind(this) },
            {name: 'Phone', key:'phone'},
            {name: 'Action', template:this._getActionTemplate.bind(this) },
        ];
    }

    render() {
        let filter = this.props.componentData && this.props.componentData.filter,
        data = (typeof filter === 'string') ? getFilteredData(this.state.friends, filter) : this.state.friends;

        return (
            <div>
                <DataTable data={data} columns={this.state.columns} />
            </div>
        );
    }

    _getNameTemplate(friend) {
        return friend && friend.first_name + ' ' + friend.last_name;
    }

    _getActionTemplate(friend) {
        return (
            <div className="action-tab">
                <a href="javascript:void(0)" onClick={this._onClickEdit.bind(this, friend)}>
                    <Icon src={svg.EDIT} />
                </a>
                <a href="javascript:void(0)" onClick={this._onClickUnfriend.bind(this, friend)}>
                    <Icon src={svg.UNFRIEND} />
                </a>
                <a href="javascript:void(0)" onClick={this._onClickDelete.bind(this, friend)}>
                    <Icon src={svg.DELETE} />
                </a>
            </div>
        );
    }

    _onClickEdit(friend) {
        this.state.componentData.onClickEditFriend(friend.user_id);
    }

    _onClickUnfriend(friend) {
        swal({
            title: 'Are you sure?',
            text: "You want to Unfriend "+friend.first_name+"?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            debugger;
            if(result.dismiss) {
                return;
            }
            // Fetch list of Friends
            let user_id = friend.user_id;
            axios.post(
                'controller/friends-controller.php', {
                    action: 'unFriend',
                    user_id
                }
            ).then(response => {
                if(response.data) {
                    swal(
                        'Unfriend!',
                        'You are unfriend with '+friend.first_name+'.',
                        'success'
                    );
                    this._getAllFriends();
                }
            }).catch(error => {
                console.log(error);
            });
        });
    }

    _onClickDelete(friend) {
        swal({
            title: 'Are you sure?',
            text: "You want to Delete "+friend.first_name+"?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            if(result.dismiss) {
                return;
            }
            // Fetch list of Friends
            let user_id = friend.user_id;
            axios.post(
                'controller/friends-controller.php', {
                    action: 'deleteFriend',
                    user_id
                }
            ).then(response => {
                if(response.data) {
                    swal(
                        'Delete!',
                        friend.first_name+' is deleted successfully.',
                        'success'
                    );
                    this._getAllFriends();
                }
            }).catch(error => {
                console.log(error);
            });
        });
    }

    _getAllFriends() {
        // Fetch list of Friends
        let owner_id = localStorage.getItem('user_id');
        axios.post(
            'controller/friends-controller.php', {
                action: 'fetchMyFriends',
                owner_id
            }
        ).then(response => {
            const friendsData = response.data;
            if(Object.keys(friendsData).length) {
                this.setState({friends: friendsData});
            } else {
                swal('oh... oh...', 'No friends Found', 'error');
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

MyFriendsList.propTypes = {
    componentData: PropTypes.array
}

module.exports = MyFriendsList;
