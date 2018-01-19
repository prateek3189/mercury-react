import React from "react";
import PropTypes from "prop-types";
import ComponentTypes from "./component-types";

class ContentRenderer extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentWillMount() {
        this.setState({
            componentName: this.props.componentName
        });
    }

    render() {
        return (
            <div className="main-content">
                {this.getContentFactory()}
            </div>
        );
    }

    getContentFactory() {
        let { onComponentChange, componentName } = this.props;
        var contentElement;

        if(componentName){
            contentElement = React.createElement(ComponentTypes.getComponentFromName(componentName), {
                onComponentChange
            });
        }

        return (
            <div className="tab-content">
                {contentElement}
            </div>
        );
    }
}

ContentRenderer.propTypes = {
    componentName: PropTypes.string,
    onComponentChange: PropTypes.func
}

module.exports = ContentRenderer;
