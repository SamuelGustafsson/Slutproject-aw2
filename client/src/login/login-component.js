import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "./login-actions";

class Login extends Component {
  renderFormInput(field) {
    const { meta: { touched, error, prestine } } = field;

    let className = "";

    if (touched && error) className = "invalid";
    else if (!prestine && !touched && !error) className = "valid";
    else {
      className = "validate";
    }

    return (
      <div>
        <input
          id={field.inputID}
          type={field.type}
          className={className}
          {...field.input}
        />
        <label htmlFor={field.inputID}>{touched ? error : field.label}</label>
      </div>
    );
  }

  onSubmit = values => {
    this.props.loginUser(values);
  };

  render() {
    if (this.props.auth === null) return null;

    if (!this.props.auth === false) {
      if (this.props.auth.type === "google") return <Redirect to="/admin" />;

      return <Redirect to="/" />;
    }

    const { handleSubmit } = this.props;
    let logginFailed =
      this.props.auth === "fail" ? "Invalid username or password." : "OR";
    return (
      <div>
        <Link to="/" className="btn">
          <i className="material-icons">arrow_back</i>
        </Link>
        <div className="row">
          <div className="col s12 m8 offset-m2 login-container">
            <h4 className="center-align">Login with</h4>
            <ul>
              <li>
                <a
                  href="/auth/google"
                  className="waves-effect waves-light btn-large login-btn red"
                >
                  Google
                </a>
              </li>
            </ul>
            <p className="center-align">{logginFailed}</p>
            <div className="row">
              <form onSubmit={handleSubmit(this.onSubmit)} className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <Field
                      inputID="usernameID"
                      label="Username"
                      name="username"
                      type="text"
                      component={this.renderFormInput}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <Field
                      inputID="passwordID"
                      label="Password"
                      name="password"
                      type="password"
                      component={this.renderFormInput}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="center-align ">
                    <button
                      className="waves-effect waves-light btn"
                      type="submit"
                    >
                      Sign in
                    </button>
                    <Link to="/signup" className="btn margin-left-10">
                      Create account
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) errors.username = "Enter a username";
  if (!values.password) errors.password = "Enter a password";

  return errors;
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default reduxForm({ validate, form: "LoginForm" })(
  connect(mapStateToProps, { loginUser })(Login)
);
