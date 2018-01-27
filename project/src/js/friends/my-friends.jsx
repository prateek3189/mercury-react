import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";

class MyFriends extends React.Component {
    constructor() {
        super();
        this.state = {
            componentName: 'MyFriendsList'
        };

        this._onComponentChange = this._onComponentChange.bind(this);
    }

    render() {
        return (
            <div>
                <h3>Friends</h3>
                <div className="search-box">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..." />
                </div>

                <div className="add-button-box">
                    <button>Add Friend</button>
                </div>
                <ComponentRenderer componentName={this.state.componentName} onComponentChange={this._onComponentChange} />
            </div>
        );
    }

    _onComponentChange(componentName) {
        this.setState({componentName});
    }
}

module.exports = MyFriends;
