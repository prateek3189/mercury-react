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
            <div>
                {this.getContentFactory()}
            </div>
        );
    }

    getContentFactory() {
        let { onComponentChange, componentName, doLogin, componentData } = this.props;
        var contentElement;

        if(componentName){
            contentElement = React.createElement(ComponentTypes.getComponentFromName(componentName), {
                onComponentChange,
                doLogin,
                componentData
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
    componentData: PropTypes.array,
    onComponentChange: PropTypes.func,
    doLogin: PropTypes.func
}

module.exports = ContentRenderer;
