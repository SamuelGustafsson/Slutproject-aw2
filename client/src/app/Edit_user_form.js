import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { editUser } from '../root-actions.js';

class EditUserForm extends Component {
  renderFormTextInput(field) {
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
          type="text"
          className={className}
          {...field.input}
        />
        <label htmlFor={field.inputID}>{touched ? error : field.label}</label>
      </div>
    );
  }

  onSubmit(values) {
    console.log("EditUserForm", values);
    // this.props.createNews(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <Link to="/" className="btn">
          {" "}
          <i className="material-icons">arrow_back</i>
        </Link>
        <div className="row">
          <form
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            className="col s12 m6 offset-m3"
          >
            <div className="row">
              <div className="input-field col s12">
                <Field
                  inputID="usernameID"
                  label="Username"
                  name="username"
                  placeholer="Test"
                  component={this.renderFormTextInput}
                />
              </div>
            </div>
            <div className="center-align">
              <button className="waves-effect waves-light btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.username) errors.username = "Username cant be empty";

  // If errors is emty, the form is fine to submit
  // If errors has *any* properties, redux for assumes from is invalid

  return errors;
}

function mapStateToProps(state) {
  user: selectedTag ? filterNewsByTag(selectedTag, news) : news;
}

export default reduxForm({
  validate,
  form: "EditUserForm"
})(connect(null, { editUser })(EditUserForm));
