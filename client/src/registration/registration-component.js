import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from "./registration-actions";

class SignUp extends Component {
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

  onSubmit(values) {
    this.props.createUser(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <form
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
          className=" col s12 m6 offset-m3"
        >
          <h3 className="center-align">Create account</h3>

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
                type="text"
                component={this.renderFormInput}
              />
            </div>
          </div>
          <div className="center-align">
            <button className="waves-effect waves-light btn" type="submit">
              Submit
            </button>
            <Link
              to="/"
              className="waves-effect waves-light btn red darken-2 margin-left-10"
              type="submit"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

//TODO: req.flash passort.js, tror det gör det lättare att visa felmeddelanden när det går år helvete i formuläret.

function validate(values) {
  const errors = {};

  if (!values.username) errors.username = "Enter a username";
  if (!values.password) errors.password = "Enter a password";

  return errors;
}

export default reduxForm({
  validate,
  form: "CreateUserForm"
})(connect(null, { createUser })(SignUp));
