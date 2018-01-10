import React from "react";
import { Link } from "react-router-dom";

const NewsListItem = props => {
  const { tags, image, title, content } = props;

  const categorys = tags.map((tag, index) => {
    return (
      <div
        className="chip"
        key={index}
        onClick={event => props.onNewsTagClick(event.target.innerHTML)}
      >
        {tag}
      </div>
    );
  });

  // const test = image ? image : props;

  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div
          className="card m6 hoverable"
          onClick={event => props.onNewsClick(props)}
        >
          <div className="card-image">
            <img src={image} alt={props.title} />
            <h2 className="card-title">{title}</h2>
            <Link
              to={`/${props._id}`}
              className="btn-floating halfway-fab waves-effect waves-light red"
            >
              <i className="material-icons">chevron_right</i>
            </Link>
          </div>
          <div className="card-content">
            {categorys}
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsListItem;
