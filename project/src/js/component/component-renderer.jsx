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
        let { onComponentChange, componentName, doLogin } = this.props;
        var contentElement;

        if(componentName){
            contentElement = React.createElement(ComponentTypes.getComponentFromName(componentName), {
                onComponentChange,
                doLogin
            });
        }

        return (
            <div>
                {contentElement}
            </div>
        );
    }
}

ContentRenderer.propTypes = {
    componentName: PropTypes.string,
    onComponentChange: PropTypes.func,
    doLogin: PropTypes.func
}

module.exports = ContentRenderer;
