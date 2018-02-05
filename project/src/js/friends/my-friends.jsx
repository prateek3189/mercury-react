import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";
import Button from 'react-validation/build/button';


class MyFriends extends React.Component {
    constructor() {
        super();
        this.state = {
            componentName: 'MyFriendsList',
            componentData: []
        };

        this._onComponentChange = this._onComponentChange.bind(this);
        this._onClickAddFriend = this._onClickAddFriend.bind(this);
        this._onClickEditFriend = this._onClickEditFriend.bind(this);
        this._searchFriend = this._searchFriend.bind(this);
    }

    componentWillMount() {
        const componentData = Object.assign(this.state.componentData, {
            onClickEditFriend: this._onClickEditFriend
        });
        this.setState({componentData});
    }

    render() {
        return (
            <div>
                <h3>Friends</h3>
                <div className="search-box">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        onChange={this._searchFriend} />
                </div>
                {this.state.componentData && !this.state.componentData.user_id ?
                    <div className="add-button-box">
                    <button onClick={this._onClickAddFriend}>Add Friend</button>
                    </div>
                : null}
                <ComponentRenderer componentName={this.state.componentName} onComponentChange={this._onComponentChange} componentData={this.state.componentData}/>
            </div>
        );
    }

    _onClickAddFriend() {
        this.setState({componentName: 'AddFriend'});
    }

    _onClickEditFriend(user_id) {
        let componentData = Object.assign(this.state.componentData, {user_id});
        this.setState({componentName: 'AddFriend', componentData});
    }

    _onComponentChange(componentName) {
        this.setState({componentName});
    }

    _searchFriend(e) {
        let componentData = Object.assign(this.state.componentData, {filter: e.target.value});
        this.setState({componentData});
    }
}

module.exports = MyFriends;
