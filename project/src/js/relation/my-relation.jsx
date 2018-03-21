import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";
import Button from 'react-validation/build/button';


class MyRelations extends React.Component {
    constructor() {
        super();
        this.state = {
            componentName: 'MyRelationsList',
            componentData: []
        };

        this._onComponentChange = this._onComponentChange.bind(this);
        this._onClickAddRelation = this._onClickAddRelation.bind(this);
        this._onClickEditRelation = this._onClickEditRelation.bind(this);
        this._searchRelation = this._searchRelation.bind(this);
    }

    componentWillMount() {
        const componentData = Object.assign(this.state.componentData, {
            onClickEditRelation: this._onClickEditRelation
        });
        this.setState({componentData});
    }

    render() {
        return (
            <div>
                <h3>Relations</h3>
                <div className="search-box">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        onChange={this._searchRelation} />
                </div>
                {this.state.componentData && !this.state.componentData.relation_id ?
                    <div className="add-button-box">
                    <button onClick={this._onClickAddRelation}>Add Relation</button>
                    </div>
                : null}
                <ComponentRenderer componentName={this.state.componentName} onComponentChange={this._onComponentChange} componentData={this.state.componentData}/>
            </div>
        );
    }

    _onClickAddRelation() {
        this.setState({componentName: 'AddRelation'});
    }

    _onClickEditRelation(relation_id) {
        let componentData = Object.assign(this.state.componentData, {relation_id});
        this.setState({componentName: 'AddRelation', componentData});
    }

    _onComponentChange(componentName) {
        this.setState({componentName});
    }

    _searchRelation(e) {
        let componentData = Object.assign(this.state.componentData, {filter: e.target.value});
        this.setState({componentData});
    }
}

module.exports = MyRelations;
