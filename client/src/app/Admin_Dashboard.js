import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class AdminDashboard extends Component {
    render() {


        return (
            <Link to="/admin/users">Users</Link>
        )
    }
}
