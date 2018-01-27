import React from 'react';
import ComponentTypes from '../component/component-types';
import PropTypes from "prop-types";

class TabStrip extends React.Component{
    constructor() {
        super();
        this.state = {
            items: null,
            selectedItem: null
        }
    }

    componentWillMount() {
        this.setState({
            items: this.props.items || [],
            selectedItem: this.props.selectedItem
        });
    }

    render() {
        return (
            <div>
                <div className="tabstrip">
                    {this.getTabHeader()}
                    {this.getTabContent()}
                </div>
            </div>
        );
    }

    getTabHeader() {
        let selectedItem = this.state.selectedItem;
        let listHTML = [];
        this.state.items && this.state.items.forEach(item => {
            listHTML.push(<li key={item.componentName} onClick={this._onSelectTab.bind(this, item)} className={selectedItem.componentName === item.componentName ? 'selected' : ''}>{item.displayName}</li>);
        });
        return (
            <div className="tab-header">
                <ul className="tab-menu">
                    {listHTML}
                </ul>
            </div>
        );
    }

    getTabContent() {
        let selectedItem = this.state.selectedItem;
        var contentElement;

        if(selectedItem.componentName){
            contentElement = React.createElement(ComponentTypes.getComponentFromName(selectedItem.componentName), selectedItem);
        }

        return (
            <div className="tab-content">
                {contentElement}
            </div>
        );
    }

    _onSelectTab(item) {
        this.setState({selectedItem: item});
    }
}

TabStrip.propTypes = {
    items: PropTypes.array,
    selectedItem: PropTypes.object
};

module.exports = TabStrip;
