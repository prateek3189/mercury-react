import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";
import TabStrip from "../common/tabstrip.jsx";

let _items = [{
        displayName: 'Friends',
        componentName: 'MyFriends'
    },{
        displayName: 'Travel',
        componentName: 'MyTravel'
    },{
        displayName: 'Profile',
        componentName: 'MyProfile'
    }];

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedItem: _items[0]
        };
    }

    render() {
        return (
            <div>
                <TabStrip items={_items} selectedItem={this.state.selectedItem}/>
            </div>
        );
    }
}

module.exports = Dashboard;
