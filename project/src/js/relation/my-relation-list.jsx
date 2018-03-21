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
        const relation = row.relation && row.relation.toLowerCase();

        if(relation.indexOf(filter) > -1 ) {
            newData.push(row);
        }
    });
    return newData;
}

class MyRelationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentName: null,
            relations: [],
            columns: this._getColumns(),
            componentData: props.componentData
        };
    }

    componentWillMount() {
        this._getAllRelations();
    }

    _getColumns() {
        return [
            {name: 'Name', key:'relation', template:this._getRelationTemplate.bind(this) },
            {name: 'Action', template:this._getActionTemplate.bind(this) }
        ];
    }

    render() {
        let filter = this.props.componentData && this.props.componentData.filter,
        data = (typeof filter === 'string') ? getFilteredData(this.state.relations, filter) : this.state.relations;

        return (
            <div>
                <DataTable data={data} columns={this.state.columns} />
            </div>
        );
    }

    _getRelationTemplate(relation) {
        return relation && relation.relation;
    }

    _getActionTemplate(relation) {
        return (
            <div className="action-tab">
                <a href="javascript:void(0)" onClick={this._onClickEdit.bind(this, relation)}>
                    <Icon src={svg.EDIT} />
                </a>
                <a href="javascript:void(0)" onClick={this._onClickDelete.bind(this, relation)}>
                    <Icon src={svg.DELETE} />
                </a>
            </div>
        );
    }

    _onClickEdit(relation) {
        this.state.componentData.onClickEditRelation(relation.relation_id);
    }

    _onClickDelete(relation) {
        swal({
            title: 'Are you sure?',
            text: "You want to Delete "+relation.relation+"?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            if(result.dismiss) {
                return;
            }
            // Fetch list of Relations
            let relation_id = relation.relation_id;
            axios.post(
                'controller/relations-controller.php', {
                    action: 'deleteRelation',
                    relation_id
                }
            ).then(response => {
                if(response.data) {
                    swal(
                        'Delete!',
                        relation.relation+' is deleted successfully.',
                        'success'
                    );
                    this._getAllRelations();
                }
            }).catch(error => {
                console.log(error);
            });
        });
    }

    _getAllRelations() {
        // Fetch list of Relations
        let owner_id = localStorage.getItem('user_id');
        axios.post(
            'controller/relations-controller.php', {
                action: 'fetchMyRelations',
                owner_id
            }
        ).then(response => {
            const relationsData = response.data;
            if(Object.keys(relationsData).length) {
                this.setState({relations: relationsData});
            } else {
                swal('oh... oh...', 'No relations Found', 'error');
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

MyRelationList.propTypes = {
    componentData: PropTypes.array
}

module.exports = MyRelationList;
