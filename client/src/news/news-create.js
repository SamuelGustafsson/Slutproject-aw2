import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createNews } from "../app/root-actions";

class NewsNew extends Component {
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
  renderFormTextarea(field) {
    const { meta: { touched, error, prestine } } = field;

    let className = "materialize-textarea";

    if (touched && error) className = "materialize-textarea invalid";
    else if (!prestine && !touched && !error)
      className = "materialize-textarea valid";
    else {
      className = "materialize-textarea validate";
    }

    return (
      <div>
        <textarea
          type="text"
          className={className}
          id={field.inputID}
          {...field.input}
        />
        <label htmlFor={field.inputID}>{touched ? error : field.label}</label>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createNews(values);
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
            className=" col s12 m6 offset-m3"
          >
            <h3 className="center-align">Post News</h3>

            <div className="row">
              <div className="input-field col s12">
                <Field
                  inputID="titleID"
                  label="Title"
                  name="title"
                  component={this.renderFormTextInput}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <Field
                  inputID="imageID"
                  label="ImageURL"
                  name="image"
                  component={this.renderFormTextInput}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <Field
                  inputID="contentID"
                  label="Content"
                  name="content"
                  component={this.renderFormTextarea}
                />
              </div>
            </div>
            {/* TODO: Add functionality to add tags. */}

            {/* <div className="row">
                        <div className="input-field col s12">
                            <Field
                                inputID="tagsID"
                                label="Add tags"
                                name="tags"
                                component={this.renderFormTextInput}
                            />
                        </div>
                    </div> */}
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
  if (!values.title) errors.title = "Enter a title";
  // if (!values.imageURL) errors.imageURL = "Enter a imageURL";
  if (!values.content) errors.content = "Enter content";

  // If errors is emty, the form is fine to submit
  // If errors has *any* properties, redux for assumes from is invalid

  return errors;
}

export default reduxForm({
  validate,
  form: "NewsNewForm"
})(connect(null, { createNews })(NewsNew));
