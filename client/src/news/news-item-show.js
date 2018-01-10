import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSelectedNews, postCommentToNewsItem } from "../app/root-actions";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import Preloader from "../app/preloader-component";

class SelectedNewsItem extends Component {
  componentDidMount() {
    this.props.fetchSelectedNews(this.props.match.params.newsid);
  }

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

  commentForm(props) {
    return (
      <form
        className="col s12 m6 offset-m3"
        onSubmit={props.handleSubmit(this.onSubmit.bind(this))}
      >
        <div className="row">
          <div className="input-field col s10">
            <Field
              inputID="commentID"
              label="Add comment"
              name="text"
              component={this.renderFormTextInput}
            />
          </div>
          <div className="col s2">
            <button
              className="waves-effect waves-light btn margin-top-20"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }

  onSubmit(comment) {
    const { auth } = this.props;
    const newsId = this.props.match.params.newsid;

    const commentObj = {
      ...comment,
      author: auth.type === "google" ? auth.fullname : auth.username,
      userImage: auth.image,
      userId: auth._id,
      newsId: newsId
    };

    this.props.postCommentToNewsItem(commentObj);
    this.props.fetchSelectedNews(newsId);
  }
  render() {
    const { newsToShow, handleSubmit, auth } = this.props;

    const CommentForm =
      !auth === false ? (
        this.commentForm(this.props)
      ) : (
        <div className="col s12 m6 offset-m3 center-align">
          Loggin to comment
        </div>
      );

    if (!newsToShow) {
      return <Preloader />;
    }

    const comments = newsToShow.comments.map((comment, index) => {
      return (
        <li key={index} className="collection-item avatar">
          <img
            src={comment.userImage}
            alt={comment.author}
            className="circle"
          />
          <span className="title">{comment.author}</span>
          <p>{comment.text}</p>
        </li>
      );
    });

    const tags = newsToShow.tags.map((tag, index) => {
      return (
        <div className="chip" key={index}>
          {tag}
        </div>
      );
    });

    return (
      <div>
        <Link to="/" className="btn">
          {" "}
          <i className="material-icons">arrow_back</i>
        </Link>
        <h1>{newsToShow.title}</h1>
        <div className="row">
          <div className="center-align">{tags}</div>
        </div>
        <div className="center-align">
          <img src={newsToShow.image} alt="" />
        </div>
        <p>{newsToShow.content}</p>
        <div className="row">
          <div>
            <h5>Comments</h5>
            <ul className="collection">{comments}</ul>
            <div className="row">{CommentForm}</div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.comment) errors.comment = "Enter a comment";

  // If errors is emty, the form is fine to submit
  // If errors has *any* properties, redux for assumes from is invalid

  return errors;
}

function mapStateToProps({ news, auth }, ownProps) {
  return {
    newsToShow: news[ownProps.match.params.newsid],
    auth
  };
}

export default reduxForm({
  validate,
  form: "AddCommentForm"
})(
  connect(mapStateToProps, { fetchSelectedNews, postCommentToNewsItem })(
    SelectedNewsItem
  )
);

{
  /* TODO: Se till att commentarena realtids uppdateras */
}
