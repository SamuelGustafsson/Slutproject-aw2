import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {

    renderContent() {
        switch (this.props.auth) {
            case null:
            return;

            case false:
            return <li><Link to="/login">Login</Link></li>

                default:
                return <li><a href="/api/logout">Loggout {this.props.auth.type === "google" ? this.props.auth.fullname : this.props.auth.username}</a></li>;
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="" className="brand-logo">JSK Squashklubb</a>
                    <a href="" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        {this.renderContent()}
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                        <li><a href="">Add Newspost</a></li>
                        <li><a href="">Logga in</a></li>
                    </ul>
                </div>
            </nav>
            );
    }
}


export default Header