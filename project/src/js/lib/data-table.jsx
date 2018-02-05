import React from "react";
import PropTypes from "prop-types";
import svg from "../lib/icons";
import Icon from "svg-inline-react";

class DataTable extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <table cellspadding="0" cellSpacing="0">
                <tbody>
                    {this._getColumns()}
                    {this._getRows()}
                </tbody>
            </table>
        );
    }

    _getColumns() {
        const { columns } = this.props;
        let columnHTML = [];
        columns && columns.forEach((column, index) => {
            columnHTML.push(<th key={index}>{column.name}</th>);
        });
        return (
            <tr>
                {columnHTML}
            </tr>
        );
    }

    _getRows() {
        const { data, columns } = this.props;
        let rowHTML = [];
        if(Object.keys(data).length) {
            for(let i = 0; i < Object.keys(data).length; i++) {
                let colHTML = [];
                columns && columns.forEach((column, index) => {
                    let col = [];
                    if(column.template) {
                        col.push(column.template(data[i]));
                    } else {
                        col.push(data[i][column.key]);
                    }
                    colHTML.push(<td key={index}>{col}</td>);
                });
                rowHTML.push(<tr key={i}>{colHTML}</tr>);
            }
        } else {
            rowHTML.push(
                <tr key={0}>
                    <td colSpan={columns.length}><b>No Records Found</b></td>
                </tr>
            );
        }
        return (rowHTML);
    }
}


DataTable.propTypes = {
    data: PropTypes.object,
    columns: PropTypes.object
}

module.exports = DataTable;
