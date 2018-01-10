import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./root-actions";

class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUser(user) {
    return (
      <tr key={user._id}>
        <td>{user.type === "google" ? user.fullname : user.username}</td>
        <td>
          <p>
            <input type="checkbox" id="test5" />
            <label htmlFor="test5">Red</label>
          </p>
        </td>
      </tr>
    );
  }

  render() {
    console.log("USERLIST", this.props);
    return (
      <div>
        <Link to="/admin" className="btn">
          {" "}
          <i className="material-icons">arrow_back</i>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Admin</th>
            </tr>
          </thead>

          <tbody>{this.props.users.map(this.renderUser)}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, actions)(UserList);
