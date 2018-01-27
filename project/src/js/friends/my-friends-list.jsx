import React from "react";
import PropTypes from "prop-types";
import ComponentRenderer from "../component/component-renderer.jsx";

class MyFriendsList extends React.Component {
    constructor() {
        super();
        this.state = {
            componentName: 'MyFriendsList'
        };
    }

    render() {
        return (
            <div>
                <table cellspadding="0" cellspacing="0">
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>Hafiz Mohammed Saeed</td>
                        <td>9789879877</td>
                        <td>hafiz.mohammad.saeed@abc.com</td>
                        <td>
                            <a href="javascript:void(0)">Edit</a>
                            <a href="javascript:void(0)">Unfriend</a>
                            <a href="javascript:void(0)">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Zaki-ur-Rehman-Lakhvi</td>
                        <td>9789879877</td>
                        <td>hafiz.mohammad.saeed@abc.com</td>
                        <td>
                            <a href="javascript:void(0)">Edit</a>
                            <a href="javascript:void(0)">Unfriend</a>
                            <a href="javascript:void(0)">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Dawood Ibrahim Kaskar</td>
                        <td>9789879877</td>
                        <td>hafiz.mohammad.saeed@abc.com</td>
                        <td>
                            <a href="javascript:void(0)">Edit</a>
                            <a href="javascript:void(0)">Unfriend</a>
                            <a href="javascript:void(0)">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Syed Salahuddin</td>
                        <td>9789879877</td>
                        <td>hafiz.mohammad.saeed@abc.com</td>
                        <td>
                            <a href="javascript:void(0)">Edit</a>
                            <a href="javascript:void(0)">Unfriend</a>
                            <a href="javascript:void(0)">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Maulana Masood Azhar</td>
                        <td>9789879877</td>
                        <td>hafiz.mohammad.saeed@abc.com</td>
                        <td>
                            <a href="javascript:void(0)">Edit</a>
                            <a href="javascript:void(0)">Unfriend</a>
                            <a href="javascript:void(0)">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Hafiz Mohammed Saeed</td>
                        <td>9789879877</td>
                        <td>hafiz.mohammad.saeed@abc.com</td>
                        <td>
                            <a href="javascript:void(0)">Edit</a>
                            <a href="javascript:void(0)">Unfriend</a>
                            <a href="javascript:void(0)">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Zaki-ur-Rehman-Lakhvi</td>
                        <td>9789879877</td>
                        <td>hafiz.mohammad.saeed@abc.com</td>
                        <td>
                            <a href="javascript:void(0)">Edit</a>
                            <a href="javascript:void(0)">Unfriend</a>
                            <a href="javascript:void(0)">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Dawood Ibrahim Kaskar</td>
                        <td>9789879877</td>
                        <td>hafiz.mohammad.saeed@abc.com</td>
                        <td>
                            <a href="javascript:void(0)">Edit</a>
                            <a href="javascript:void(0)">Unfriend</a>
                            <a href="javascript:void(0)">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Syed Salahuddin</td>
                        <td>9789879877</td>
                        <td>hafiz.mohammad.saeed@abc.com</td>
                        <td>
                            <a href="javascript:void(0)">Edit</a>
                            <a href="javascript:void(0)">Unfriend</a>
                            <a href="javascript:void(0)">Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>Maulana Masood Azhar</td>
                        <td>9789879877</td>
                        <td>hafiz.mohammad.saeed@abc.com</td>
                        <td>
                            <a href="javascript:void(0)">Edit</a>
                            <a href="javascript:void(0)">Unfriend</a>
                            <a href="javascript:void(0)">Delete</a>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

module.exports = MyFriendsList;
